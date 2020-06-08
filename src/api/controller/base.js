import _ from 'lodash'

import RestClient from '../restClient'

export default class Base {

  constructor(url) {
    this.url = url
  }

  execute = (url, method, data, ...rest) => {
    const restClient = new RestClient(rest)
    return restClient.execute(url, method, data)
  }

  setUrl = (ids, url) => {
    for (const id of ids) {
      url = url.replace(':id', id)
    }
    return url
  }

  resetOption = options => {
    if (_.isEmpty(options)) return {}

    const arr = ['match', 'sort', 'field', 'populate']
    for (const key of arr) {
      options[key] && (options[key] = JSON.stringify(options[key]))
    }
    return options
  }

  get = options => {
    return this.execute(this.url.base, "get", this.resetOption(options))
  }

  getDetail = (id, options) => {
    return this.execute(`${this.url.base}/${id}`, 'get', options)
  }

  post = body => {
    return this.execute(this.url.base, 'post', body)
  }

  put = (id, body) => {
    return this.execute(`${this.url.base}/${id}`, 'put', body)
  }

  delete = id => {
    return this.execute(`${this.url.base}/${id}`, 'delete', null)
  }

  destroy = id => {
    return this.execute(`${this.url.base}/destroy/${id}`, 'delete', null)
  }
}
