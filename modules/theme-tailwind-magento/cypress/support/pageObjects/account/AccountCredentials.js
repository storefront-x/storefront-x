import uniqueNumber from '#ioc/utils/number/unique'

export default class AccountCredentials {
  constructor(params = {}) {
    this.firstName = params.firstName ?? 'Tester'
    this.lastName = params.lastName ?? 'Testovič'
    this.email = params.emal ?? `tester+${uniqueNumber()}@testovic.cz`
    this.password = params.password ?? 'TestTest123$'
  }
}
