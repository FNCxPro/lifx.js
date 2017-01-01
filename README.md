# lifx.js  
![https://www.npmjs.com/package/lifx.js](https://img.shields.io/npm/dm/lifx.js.svg) ![https://www.npmjs.com/package/lifx.js](https://img.shields.io/npm/v/lifx.js.svg)  
**Requires a Node.js version equal to or higher than 6.9.0!**  
A LIFX API for Node.js

## Installation  
Run ```npm install lifx.js``` in a shell.

## Usage & Example
```javascript
const LIFX = require('lifx.js');
const api = new LIFX.LIFX("your lifx http api token");
api.getLights().then(lights => {
  for(let _lt in lights) {
    if(!lights.hasOwnProperty(_lt)) continue;
    let light = lights[_lt];
    light.togglePower();
    console.log(light.label);
  }
}).catch(res => {
  console.error(res);
});
```  
[See more examples](../example/)

## Documentation
We now have [documentation](https://fncxpro.github.io/lifx.js/)!