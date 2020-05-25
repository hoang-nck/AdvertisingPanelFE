import Base from './base'
import { file as fileUrl } from '../urls'

class File extends Base {
  constructor () {
    super(fileUrl)
  }

  uploadFile = file => {
    let body = new FormData()
    body.append('file', file)
    return this.execute(fileUrl.uploadFile, 'post', body)
  }
}

module.exports = new File()
