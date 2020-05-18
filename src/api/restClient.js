import { create } from 'apisauce'
import store from 'store'
import _ from 'lodash'

import urls from './urls'
import config from '../utils/config'
import ApiResponse from './apiResponse'
import common from '../utils/common'

export default class RestClient {

  constructor(obj) {
    this.timeout = obj.timeout || config.timeout
    this.tag = 'RestClient'
    this.headers = {
      'Content-Type': 'application/json',
      token: store.get('token') || '',
      language: config.language,
      ...obj.headers
    }
  }

  setToken = token => {
    this.headers.token = token
  }

  setLanguage = laguage => {
    this.headers.language = laguage
  }

  setTimeout = timeout => {
    this.timeout = timeout
  }

  execute = (url, method, body) => async () => {
    try {
      this.restClient = create({
        baseURL: urls.baseUrl,
        headers: this.headers,
        timeout: this.timeout
      })

      let func = null, log = ''
      switch (method) {
        case 'get': {
          if (_.isObject(body)) {
            let index = 0
            let query = ''
            Object.keys(body).map(key => {
              let bullet = index == 0 ? '?' : '&'
              query += bullet + key + '=' + body[key]
              index++
            })

            url += query
          }
          log = `${this.tag} --> Get's url: ${url}`

          func = this.restClient.get(url)
          break
        }
        case 'post': {
          log = `${this.tag} --> Post's url: ${url}`
          func = this.restClient.post(url, body)
          break
        }
        case 'put': {
          log = `${this.tag} --> Put's url: ${url}`
          func = this.restClient.put(url, body)
          break
        }
        case 'delete': {
          log = `${this.tag} --> Delete's url: ${url}`
          func = this.restClient.delete(url, body)
          break
        }
      }

      common.log(log)
      const response = func != null ? await func : null

      return this.setDataResponse(response)
    } catch (error) {
      // console.log({error})
      return this.setDataResponse(error.massage, 505)
    }

  }

  setDataResponse = (response, status = null) => {
    let data = null
    if (response == null) {
      data = new ApiResponse({
        success: false,
        statusCode: 501,
        message: 'Response is null'
      })
    } else if (status == 505) {
      data = new ApiResponse({
        success: false,
        statusCode: status,
        message: response
      })
    } else {
      switch (response.status) {
        case 200: {
          data = new ApiResponse(response.data)
          break
        }
        default: {
          data = new ApiResponse({
            success: false,
            statusCode: response.status,
            message: 'Request error'
          })
        }
      }
    }
    return data.getData()
  }

}
