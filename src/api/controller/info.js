import Base from './base'
import urls from '../urls'

class Info extends Base {
  constructor (url) {
    super(url)
    this.url = url
  }
}

module.exports = new Info(urls.info)
