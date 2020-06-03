import Base from './base'
import urls from '../urls'

class News extends Base {
  constructor (url) {
    super(url)
    this.url = url
  }
}

module.exports = new News(urls.news)
