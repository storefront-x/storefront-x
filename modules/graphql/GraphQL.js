import consola from 'consola'
import isArray from '#ioc/utils/isArray'
import isNullish from '#ioc/utils/isNullish'
import isObject from '#ioc/utils/isObject'
import isString from '#ioc/utils/isString'
import isNonEmptyArray from '#ioc/utils/isNonEmptyArray'
import isFunction from '#ioc/utils/isFunction'
import isNonEmptyObject from '#ioc/utils/isNonEmptyObject'
import once from '#ioc/utils/once'
import hashCode from '#ioc/utils/string/hashCode'
import objectToQuery from '#ioc/utils/url/objectToQuery'
import CACHE_ID from '#ioc/config/CACHE_ID'

const logger = consola.withTag('graphql')

export class Gql {
  constructor() {
    this._fields = {}
    this._fragments = {}
    this._isCacheable = true
  }

  /**
   * Accepts dictionary of GraphQL fields which will be added to the current one
   *
   * @param {Object.<string, Field>} fields
   * @returns {this}
   */
  fields(fields) {
    if (isNullish(fields)) return this

    for (const [name, field] of Object.entries(fields)) {
      if (!field) continue

      if (field instanceof Fragment) {
        this._fragments[name] = field
      } else if (field._name) {
        field._alias = name
      } else {
        field._name = name
      }

      this._fields[name] = field
    }

    return this
  }

  /**
   * @returns {this}
   */
  cantBeCached() {
    this._isCacheable = false

    return this
  }

  isCacheable() {
    if (!this._isCacheable) return false

    const fragments = this._collectFragments()
    for (const fragment of Object.values(fragments)) {
      if (!fragment.isCacheable()) return false
    }

    return true
  }

  _stringifyFields() {
    const fields = Object.values(this._fields)
      .map((field) => field.toString())
      .join(',')

    if (!fields) return ''

    return `{${fields}}`
  }

  _stringifyFragments() {
    const fragments = this._collectFragments()

    return Object.values(fragments)
      .map((fragment) => fragment.extract())
      .join('')
  }

  _collectFragments(fragments = {}) {
    for (const fragment of Object.values(this._fragments)) {
      fragments[fragment._name] = fragment
    }

    for (const field of Object.values(this._fields)) {
      if (!isFunction(field._collectFragments)) continue

      fragments = field._collectFragments(fragments)
    }

    return fragments
  }
}

export class Field extends Gql {
  constructor(arg1, arg2) {
    super()

    this._name = ''
    this._alias = ''
    this._args = {}

    if (isString(arg1)) {
      this._name = arg1
    } else if (isObject(arg1)) {
      this.fields(arg1)
    }

    if (isObject(arg2)) {
      this.fields(arg2)
    }
  }

  _stringifyName() {
    if (!this._alias) return this._name
    if (this._alias === this._name) return this._name

    return `${this._alias}:${this._name}`
  }

  _stringifyValue(value) {
    if (isNullish(value)) return 'null'

    if (isString(value)) return value.startsWith('$') ? value : `"${value}"`

    if (isArray(value)) {
      const stringified = value.map((val) => this._stringifyValue(val)).join(',')

      return `[${stringified}]`
    }

    if (isObject(value)) {
      const stringified = Object.entries(value)
        .map(([key, val]) => `${key}:${this._stringifyValue(val)}`)
        .join(',')

      return `{${stringified}}`
    }

    return value
  }

  /**
   * Accepts object of arguments for the current field
   * To use variables, prefix their name with a dollar sign
   *
   * Usage:
   *
   * .args({
   *   id: '$id',
   *   filter: { url_key: { eq: '$urlKey' } },
   * })
   *
   * @param {Object.<string, any>} args
   * @returns {this}
   */
  args(args) {
    for (const [name, arg] of Object.entries(args)) {
      this._args[name] = arg
    }

    return this
  }

  _stringifyArgs() {
    const args = Object.entries(this._args)
      .map(([key, value]) => `${key}:${this._stringifyValue(value)}`)
      .join(',')

    if (!args) return ''

    return `(${args})`
  }

  /**
   * Stringifies the current field
   *
   * @returns {string}
   */
  toString() {
    const name = this._stringifyName()
    const args = this._stringifyArgs()
    const fields = this._stringifyFields()

    return name + args + fields
  }
}

export class Request extends Gql {
  constructor(arg) {
    super()

    this._ignoredErrors = []

    this._variables = {}
    this._bindings = {}

    this._endpoint = ''
    this._headers = {}
    this._hash = null

    if (isObject(arg)) {
      this.fields(arg)
    }
  }

  /**
   * @param {any[]} errors
   */
  ignoresErrors(errors) {
    this._ignoredErrors = errors

    return this
  }

  /**
   * Accepts the object of variables for the current request
   * Variable name has to start with a dollar sign
   *
   * Usage:
   *
   * .variables({
   *   $id: 'String!',
   *   $sort: 'ProductAttributeSortInput',
   * })
   *
   * @param {Object.<string, string>} variables
   * @returns {this}
   */
  variables(variables) {
    for (const [name, variable] of Object.entries(variables)) {
      this._variables[name] = variable
    }

    return this
  }

  _stringifyVariables() {
    const variables = Object.entries(this._variables)
      .map(([name, type]) => `${name}:${type}`)
      .join(',')

    if (!variables) return ''

    return `(${variables})`
  }

  /**
   * Adds variable bindings to the current request
   * Binding names do not start with a dollar sign
   *
   * Usage:
   *
   * .with({ id, sort })
   *
   * @param {Object.<string, any>} bindings
   * @returns {this}
   */
  with(bindings) {
    for (const [name, binding] of Object.entries(bindings)) {
      this._bindings[name] = binding
    }

    return this
  }

  withEndpoint(endpoint) {
    this._endpoint = endpoint

    return this
  }

  withHeaders(headers) {
    this._headers = headers

    return this
  }

  withHash(hash) {
    this._hash = hash

    return this
  }

  async _fetch(ctx) {
    const query = this.toString()
    const variables = this._bindings

    const endpoint = isFunction(this._endpoint) ? this._endpoint(ctx) : this._endpoint
    const headers = isFunction(this._headers) ? this._headers(ctx) : this._headers
    const hash = isFunction(this._hash) ? this._hash(ctx) : this._hash

    const _get = async () => {
      const body = objectToQuery({
        query,
        variables: isNonEmptyObject(variables) ? variables : undefined,
        // Adding hash to request URL will prevent service
        // worker from serving stale data from cache,
        // for example when the store is changed.
        h: hashCode(JSON.stringify(hash)),
        c: CACHE_ID,
      })

      const response = await fetch(`${endpoint}?${body}`, {
        method: 'GET',
        headers,
      })

      return response
    }

    const _post = async () => {
      const body = JSON.stringify({
        query,
        variables,
      })

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body,
      })

      return response
    }

    const response = await (this.isCacheable() ? _get() : _post())

    const contentType = response.headers.get('Content-Type')

    if (contentType.includes('application/json')) {
      const { data, errors } = await response.json()

      if (isNonEmptyArray(errors)) {
        for (const error of errors) {
          if (this._ignoredErrors.includes(error.message)) {
            once(`Supressed error for "${error.message}"`, (msg) => logger.warn(msg))
            continue
          }

          logger.error(
            query,
            JSON.stringify(variables),
            JSON.stringify(headers),
            error.message,
            error.debugMessage ? `(${error.debugMessage})` : '',
          )
        }

        for (const error of errors) {
          if (this._ignoredErrors.includes(error.message)) continue

          throw new GraphQLError(error)
        }
      }

      return data
    } else {
      const text = await response.text()

      logger.error(query, JSON.stringify(variables), text)

      throw new Error(text)
    }
  }

  /**
   * Stringifies the current request
   *
   * @returns {string}
   */
  toString() {
    const variables = this._stringifyVariables()
    const fields = this._stringifyFields()
    const fragments = this._stringifyFragments()

    return `${variables}${fields}${fragments}`
  }

  _dump() {
    let str = ''

    str += '\n\n'
    str += this.toString()
    str += '\n\n'
    str += JSON.stringify(this._bindings)

    // eslint-disable-next-line no-console
    console.log(str)

    return this
  }
}

/**
 * GraphQL query
 */
export class Query extends Request {
  /**
   * Executes and fetches the current query
   * Returned objects has keys based on the names of top level fields
   *
   * Usage:
   *
   * const productsQuery = query({
   *   products: field({
   *     id: field(),
   *   })
   * })
   *
   * const { products } = await productsQuery.fetch(ctx);
   *
   * @param {any} ctx Nuxt.js context
   * @returns {Promise.<Object.<string, any>>}
   */
  /**
   * @returns {Query}
   */
  clone() {
    const query = new Query()

    query._fields = { ...this._fields }
    query._variables = { ...this._variables }
    query._bindings = { ...this._bindings }

    return query
  }

  /**
   * Stringifies the current query
   *
   * @returns {string}
   */
  toString() {
    return 'query' + super.toString()
  }
}

/**
 * GraphQL mutation
 */
export class Mutation extends Request {
  /**
   * Executes and fetches the current mutation
   * Returned objects has keys based on the names of top level fields
   *
   * Usage:
   *
   * const createEmptyCartMutation = mutation({
   *   createEmptyCart: field(),
   *  });
   *
   * const { createEmptyCart } = await createEmptyCartMutation.fetch(ctx);
   *
   * @param {any} ctx Nuxt.js context
   * @returns {Promise.<Object.<string, any>>}
   */
  async fetch(ctx) {
    const response = await this._fetch(ctx)

    return response
  }

  /**
   * @returns {Mutation}
   */
  clone() {
    const mutation = new Mutation()

    mutation._fields = { ...this._fields }
    mutation._variables = { ...this._variables }
    mutation._bindings = { ...this._bindings }

    return mutation
  }

  /**
   * Stringifies the current mutation
   *
   * @returns {string}
   */
  toString() {
    return 'mutation' + super.toString()
  }
}

export class Fragment extends Gql {
  constructor(name, type, fields = {}) {
    super()

    this._name = name
    this._type = type

    if (isObject(fields)) {
      this.fields(fields)
    }
  }

  inline() {
    return this._fields
  }

  extract() {
    const fields = this._stringifyFields()

    return `fragment ${this._name} on ${this._type}` + fields
  }

  toString() {
    return `...${this._name}`
  }
}

export class GraphQLError extends Error {
  constructor(error) {
    super(error.message)

    this.extensions = error.extensions
    this.locations = error.locations
  }
}

export const addFields = (gql, ...args) => {
  if (args.length === 1) {
    const fields = args[0]

    gql.fields(fields)
  } else if (args.length === 2) {
    const path = args[0].split('.')
    const fields = args[1]

    for (const part of path) {
      gql = gql._fields[part]
    }

    gql.fields(fields)
  }
}
