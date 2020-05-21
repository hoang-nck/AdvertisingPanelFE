import Base from './base'
import urls from '../urls'

class User extends Base {
  constructor (url) {
    super(url)
    this.url = url
  }

  login = body => {
    return this.execute(this.url.base + this.url.login, 'post', body)
  }

  logout = () => {
    return this.execute(this.url.base + this.url.logout, 'get', null)
  }
}

module.exports = new User(urls.user)
