import Base from './base'
import urls from '../urls'

class House extends Base {
  constructor (url) {
    super(url)
    this.url = url;
  }

  getTables = (ids, options) => {
    return this.execute(this.setUrl(ids, this.url.getTable), 'get', this.resetOption(options))
  }
}

module.exports = new House(urls.house)
