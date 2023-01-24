import ELASTIC_URL from '#ioc/config/ELASTIC_URL'
import IS_SERVER from '#ioc/config/IS_SERVER'
/**
 * Query is class for querying records from elasticsearch.
 *
 * New query is initialized with one of the static methods (products, categories and brands)
 *
 * await Query.products() // query for products
 *   .only('id', 'name') // we only want id and name of the returned products
 *   .where('category_id', cateogryId) // and we only want products from this category
 *   .whereIn('drmax_brand', brandId1, brandId2, brandId3) // and only from these three brands
 *   .from(48) // and only products from 48th product (skip first 48 products)
 *   .get(24) // and 24 products per page
 */

export default class Query {
  constructor(type) {
    this._url = IS_SERVER ? ELASTIC_URL + '/_e' : '/_elastic'
    this._type = type

    this._size = 10
    this._from = 0

    this._named = {}

    this._sort = []
    this._only = []

    this._should = []
    this._must = []
    this._must_not = []

    this._aggs = {}
  }

  /**
   * Creates new query which can return anything
   */
  static any() {
    return new Query(null)
  }

  /**
   * Creates new query for products only
   */
  static products() {
    return new Query('product').index('drmax_frontend_products_1')
  }

  /**
   * Creates new query for categories only
   */
  static categories() {
    return new Query('category').index('drmax_frontend_category_1')
  }

  /**
   * Creates new query for brands only
   */
  static brands() {
    return new Query('brand')
  }

  /**
   * Creates new query for attributes only
   */
  static attributes() {
    return new Query('attribute')
  }

  /**
   * Creates new query for mega menus only
   */
  static megaMenus() {
    return new Query('mega_menu')
  }

  /**
   * Creates new query for product attachments only
   */
  static productAttachments() {
    return new Query('product_attachment')
  }

  /**
   * Creates new query for promo actions only
   */
  static promoActions() {
    return new Query('promo_action')
  }

  /**
   * Creates new query for cms pages only
   */
  static pages() {
    return new Query('cms_page')
  }

  index(index) {
    this._index = index
    return this
  }

  /**
   * Limits results to only records where 'field' is equal to 'value'
   * .where('id', 3) will return only records whose id is 3
   */
  where(field, value) {
    this._must.push({
      term: {
        [field]: {
          value: value,
        },
      },
    })

    return this
  }

  /**
   * Limits results to only records where 'field' is not equal to 'value'
   * .whereNot('id', 3) will return only records whose id is not 3
   */
  whereNot(field, value) {
    this._must_not.push({
      term: {
        [field]: {
          value: value,
        },
      },
    })

    return this
  }

  /**
   * Limits results to only records where 'field' is equal to one of the 'values'
   * .whereIn('id', 1, 2, 3) will return only records whose id is 1 or 2 or 3
   * Second parameter can also be array: .whereIn('id', [1, 2, 3])
   */
  whereIn(field, ...values) {
    this._must.push({
      terms: {
        [field]: this._normalizeArgs(values),
      },
    })

    return this
  }

  /**
   * Limits results to only records where 'field' is not equal to any of the 'values'
   * .whereNotIn('id', 1, 2, 3) will return only records whose id is not 1 nor 2 nor 3
   * Second parameter can also be array: .whereNotIn('id', [1, 2, 3])
   */
  whereNotIn(field, ...values) {
    this._must_not.push({
      terms: {
        [field]: this._normalizeArgs(values),
      },
    })

    return this
  }

  /**
   * Filters the records based on the passed in script
   * .script("doc['final_price'].value < doc['regular_price'].value") will return records whose final_price is lower than regular_price
   */
  script(script) {
    this._must.push({
      script: {
        script: script,
      },
    })

    return this
  }

  prefix(field, value) {
    this._must.push({
      prefix: {
        [field]: {
          value: value,
        },
      },
    })

    return this
  }

  exists(field) {
    this._must.push({
      exists: {
        field: field,
      },
    })

    return this
  }

  /**
   * Returns records starting from this index
   * It is used with pagination to skip x pages
   * .from(24) will return records with index 24 or more (in other way it skips first 24 records)
   */
  from(from) {
    this._from = parseInt(from)

    return this
  }

  /**
   * Sorts result by the 'field' and 'order'
   */
  sort(field, order = 'asc') {
    this._sort.push({
      [field]: {
        order: order,
      },
    })

    return this
  }

  /**
   * Allows sorting by nested field while also limiting the possible values with callback
   *
   * Example:
   * Product has field category which is array of categories. Every category has position.
   * We want to sort products by the position of current category represented by categoryId.
   * .sortNested('category.position', 'desc', 'category', q => q.where('category.category_id', categoryId))
   */
  sortNested(field, direction = 'asc', nestedField, callback) {
    const nestedQuery = Query.any()

    callback(nestedQuery)

    this._sort.push({
      [field]: {
        order: direction,
        nested_path: nestedField,
        nested_filter: nestedQuery._query(),
      },
    })

    return this
  }

  /**
   * Adds aggregation by 'field' limited to 'size' amount of results.
   * By defualt it does unique aggregate, so .aggregate('brand', 10) will return maximum of 10 brands
   * and each having a count of how many times the brand is present in the result set.
   */
  aggregate(field, size = 25) {
    this._aggs[field] = {
      terms: {
        field: field,
        size: size,
      },
    }

    return this
  }

  /**
   * Limits the fields which are returned.
   * This can radically decrease size of the response if you only care about few fields
   * .only('id', 'name', 'description') will return only id, name and description and omit other fields form the response
   * First parameter can also be array: .only(['id', 'name', 'description']))
   */
  only(...fields) {
    fields = this._normalizeArgs(fields)

    this._only = fields

    return this
  }

  /**
   * Add subquery which should be applied to the result set.
   *
   * Example:
   * If record with ID of 10 exists, it should be added to the result set, otherwise not.
   * .should(q => q.where('id', 10))
   */
  should(callback) {
    const should = Query.any()

    callback(should)

    this._should.push(should._query())

    return this
  }

  /**
   * Add subquery which must be applied to the result set.
   *
   * Example:
   * Only record with ID of 10 must be in the result set.
   * .must(q => q.where('id', 10))
   *
   * .should and .must can be combined to imitate AND/OR functionality
   *
   * Example:
   * We want records with IDs 10 or 20 and names 'A' or 'B'
   * .must(q => {
   *   q.should(q => q.'id', 10)
   *   q.should('id', 20)
   * })
   * .must(q => {
   *   q.should('id', 10)
   *   q.should('id', 20)
   * })
   */
  must(callback) {
    const must = Query.any()

    callback(must)

    this._must.push(must._query())

    return this
  }

  /**
   * Add named subquery which can be later removed with .without
   */
  named(name, callback) {
    const query = Query.any()

    callback(query)

    this._named[name] = query

    return this
  }

  /**
   * Removed named subquery
   */
  without(name) {
    delete this._named[name]

    return this
  }

  /**
   * Limits the number of results to 'size'
   */
  size(size) {
    this._size = parseInt(size)

    return this
  }

  /**
   * Finalizing method of the Query builder
   * Builds the query and fetches the records from elasticsearch
   * It returns plain array of records
   * Default number of returned records is 10 and can be change with the 'size' parameter
   */
  async get(size = null) {
    if (size != null) {
      this._size = size
    }

    const response = await this.fetch()

    return response.hits.hits.map((hit) => hit._source)
  }

  /**
   * Finalizing method of the Query builder
   * Builds the query and fetches the records from elasticsearch
   * It returns the first plain record
   */
  async first() {
    const response = await this.fetch(1)

    return response.hits.hits.length === 1 ? response.hits.hits[0]._source : null
  }

  /**
   * Finalizing method of the Query builder
   * Builds the query and returns only aggregations returned from the elasticsearch
   * If 'aggregation' argument is set, it returns only this aggregation
   */
  async aggregations(aggregation = null) {
    const result = await this.fetch(0)

    if (aggregation === null) {
      return result.aggregations
    }

    return result.aggregations[aggregation].buckets
  }

  async paginate(size = null) {
    const response = await this.fetch(size)

    return {
      items: response.hits.hits.map((hit) => hit._source),
      total: response.hits.total,
      perPage: this._size,
      currentPage: this._from / this._size + 1,
    }
  }

  /**
   * Finalizing method of the Query builder
   * Builds the query and returns raw response from the elasticsearch
   */
  async fetch(size = null) {
    if (size !== null) this._size = size

    const type = this._type ? `/${this._type}` : ''
    const action = '/_search'
    const body = JSON.stringify(this._build())

    const url = `${this._url}${type}${action}?index=${encodeURIComponent(this._index)}&body=${encodeURIComponent(body)}`

    const response = await fetch(url)

    return response.json()
  }

  /**
   * Creates clone of the query
   */
  clone() {
    const query = new Query(this._type)

    query._size = this._size
    query._from = this._from

    query._named = { ...this._named }

    query._sort = [...this._sort]
    query._only = [...this._only]

    query._should = [...this._should]
    query._must = [...this._must]
    query._must_not = [...this._must_not]

    query._aggs = { ...this._aggs }

    return query
  }

  _build() {
    return {
      _source: this._only,
      size: this._size,
      from: this._from,
      sort: this._sort,
      query: this._query(),
      aggs: this._aggs,
    }
  }

  _query() {
    return {
      bool: {
        must: this.getMust(),
        must_not: this.getMustNot(),
        should: this.getShould(),
      },
    }
  }

  _normalizeArgs(args) {
    if (args.length === 1 && Array.isArray(args[0])) {
      return args[0]
    }

    return args
  }

  /**
   * Returns array of should conditions
   */
  getShould() {
    return this._should.concat(Object.values(this._named).flatMap((named) => named._should))
  }

  /**
   * Returns array of must conditions
   */
  getMust() {
    return this._must.concat(Object.values(this._named).flatMap((named) => named._must))
  }

  /**
   * Returns array of must_not conditions
   */
  getMustNot() {
    return this._must_not.concat(Object.values(this._named).flatMap((named) => named._must_not))
  }
}
