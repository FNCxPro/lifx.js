const requestify = require('requestify')
const Light = require('./Light')
/**
 * LIFX HTTP API class
 * @class
 */
class LIFX {
  /**
   * Create an instance of the LIFX HTTP API
   * @param {String} token - The token to authenticate.
   * @param {String} [apiBase] - API base URL. Defaults to https://api.lifx.com. Remove a trailing slash at the end!
   */
  constructor(token, apiBase) {
    if(!token || typeof token !== 'string') throw new TypeError('Token must be a string.')

    /**
     * Token to use to authenticate to the LIFX HTTP API.
     * @type {String}
     * @readonly
     */
    Object.defineProperty(this, 'token', {value: token})

    /**
     * API Base URL
     * @type {String}
     */
    this.apiBase = apiBase || "https://api.lifx.com"
  }

  /**
   * Get lights by selector.
   * @param {string} [selector] - The selector to find lights for. If not passed, all lights.
   * @return {Promise}
   */
  getLights(selector) {
    let sel = selector || 'all'
    sel = sel.toString()
    return new Promise((fulfill, reject) => {
      requestify.get(`${this.apiBase}/v1/lights/${sel}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).then(res => {
        let body = res.getBody()
        let lights = []
        for(let _lt in body){
          if(!body.hasOwnProperty(_lt)) continue
          lights.push(new Light(body[_lt], this))
        }
        fulfill(lights)
      })
      .fail(res => {
        reject(res)
      })
    })
  }
  
  /**
   * Set the token that the class will use to authenticate.
   * @param {String} token - The token to use.
   * @return {String}
   */
  setToken(token) {
    if(!token || typeof token !== 'string') throw new TypeError('Token must be a string.')
    Object.defineProperty(this, 'token', {value: token})
    //TODO: Add any additional handling to the token.
    return this.token
  }
}

module.exports = LIFX