const LIFX = require('../src/index')
if(!process.env || !process.env.LIFX_TOKEN) throw new Error('Please define your LIFX HTTP API token in an environment variable labeled "LIFX_TOKEN"!')

const api = new LIFX.LIFX(process.env.LIFX_TOKEN)

api.getLights().then(lights => {
  for(let _lt in lights) {
    if(!lights.hasOwnProperty(_lt)) continue
    let light = lights[_lt]
    light.setState({
      power: 'on'
    })
    console.log(light.label)
  }
}).catch(res => {
  console.log(res)
})