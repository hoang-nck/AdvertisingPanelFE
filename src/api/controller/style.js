import Base from './base'
import urls from '../urls'

class Style extends Base {
  constructor (url) {
    super(url)
    this.url = url
  }
}

module.exports = new Style(urls.style)
