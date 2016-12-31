const requestify = require('requestify')
/* LIFX Light Class */
class Light {
  /**
   * Create a new Light class.
   * @param {Object} options - Options to create the light with.
   * @param {LIFX} LIFX - LIFX HTTP API Class to use when doing certain methods.
   */
  constructor(options, LIFX) {
    /**
     * LIFX Class
     * @type {LIFX}
     * @memberof external:LIFX
     */
    this.LIFX = LIFX

    this.initialize(options)
  }
  initialize(options) {
    if(!options || typeof options !== 'object') throw new TypeError('Options must be an object.')
    if(!options.id || typeof options.id !== 'string') throw new TypeError('options.id must be a string.')
    if(!options.uuid || typeof options.uuid !== 'string') throw new TypeError('options.uuid must be a string.')
    if(!options.label || typeof options.label !== 'string') throw new TypeError('options.label must be a string.')
    if(!options.connected || typeof options.connected !== 'boolean') throw new TypeError('options.connected must be a boolean.')
    if(!options.power || typeof options.power !== 'string') throw new TypeError('options.power must be a string.')
    if(!options.brightness || typeof options.brightness !== 'number') throw new TypeError('options.brightness must be a number.')
    if(!options.group || typeof options.group !== 'object') throw new TypeError('options.group must be an object.')
    if(!options.location || typeof options.location !== 'object') throw new TypeError('options.location must be an object.')
    if(!options.product || typeof options.product !== 'object') throw new TypeError('options.product must be an object.')

    /* product checking */
    if(!options.product.name || typeof options.product.name !== 'string') throw new TypeError('options.product.name must be a string.')
    if(!options.product.company || typeof options.product.company !== 'string') throw new TypeError('options.product.company must be a string.')
    if(!options.product.identifier || typeof options.product.identifier !== 'string') throw new TypeError('options.product.identifier must be a string.')
    if(!options.product.capabilities || typeof options.product.capabilities !== 'object') throw new TypeError('options.product.capabilities must be an object.')
    //TODO: More checking?

    this.options = options
    /**
     * ID of the Light
     * @type {String}
     */
    this.id = options.id

    /**
     * Unique ID of the Light
     * @type {String}
     */
    this.uuid = options.uuid

    /**
     * Label of the Light
     * @type {String}
     */
    this.label = options.label

    /**
     * Connection status of the Light
     * @type {boolean}
     */
    this.connected = options.connected

    /**
     * If the light is on/off.
     * @type {string}
     */
    this.power = options.power

    /**
     * The brightness of the Light.
     * @type {number}
     */
    this.brightness = options.brightness

    /**
     * The group of the Light.
     * @type {Object}
     */
    this.group = options.group

    /**
     * The location of the Light.
     * @type {Object}
     */
    this.location = options.location

    /**
     * What the light is.
     * @type {Object}
     */
    this.product = options.product
  }


  /**
   * Refreshes the Light information.
   * @return {Promise}
   */
  refresh() {
    return new Promise((fulfill, reject) => {
      requestify.get(`${this.LIFX.apiBase}/v1/lights/${this.id}`, {
        headers: {
          Authorization: `Bearer ${this.LIFX.token}`
        }
      }).then(res => {
        this.initialize(res.getBody()[0])
        fulfill(this)
      })
      .fail(res => {
        reject(res)
      })
    })
  }

  /**
   * Toggles power of the Light
   * @param {number} [duration] - The time in seconds to spend perfoming the power toggle.
   * @return {Promise}
   */
  togglePower(duration) {
    return new Promise((fulfill, reject) => {
    requestify.post(`${this.LIFX.apiBase}/v1/lights/${this.id}/toggle`, {
      duration: duration || '1.0'
    }, {
        headers: {
          Authorization: `Bearer ${this.LIFX.token}`
        }
      }).then(res => {
        fulfill(this.refresh())
      })
      .fail(res => {
        reject(res)
      })
    })
  }
}

module.exports = Light