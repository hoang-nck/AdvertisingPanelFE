import Base from './base'
import urls from '../urls'

class Advertisement extends Base {
  constructor (url) {
    super(url)
    this.url = url
  }
}

module.exports = new Advertisement(urls.advertisement)
