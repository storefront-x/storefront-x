import uniqueNumber from '#ioc/utils/number/unique'

export default class AccountCredentials {
  constructor(params = {}) {
    this.firstName = params.firstName ?? 'Tester'
    this.lastName = params.lastName ?? 'Testovič'
    this.email = params.emal ?? `tester+${uniqueNumber()}@testovic.cz`
    this.password = params.password ?? 'TestTest123$'
    this.street = params.street ?? 'Testovací'
    this.city = params.city ?? 'Brno'
    this.zipcode = params.zipcode ?? '12345'
    this.countryCode = params.countryCode ?? 'CZ'
  }
}
