[![huntr](https://cdn.huntr.dev/huntr_security_badge_mono.svg)](https://huntr.dev)

[![NPM](https://nodei.co/npm/@birbjs/snowflake.png)](https://nodei.co/npm/@birbjs/snowflake/)

# @birbjs/snowflake
This package allows for easy generation and interpretation of Discord snowflakes. It is mainly used for the [birb](https://npmjs.com/package/birb) package. You should already have this package installed if you are using Birb.JS.

## Installation
This package is bundled with Birb.JS. You should install Birb.JS using `npm install birb --save`.

## Usage
```js
// Generate a snowflake from a user ID ...
const { Snowflake } = require('@birbjs/snowflake');
const snowflake = new Snowflake('914338137600294982');
```
