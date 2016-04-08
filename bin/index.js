#! /usr/bin/env node
var path = require('path')
var bggGet = require('bgg-get')
var config = require(path.resolve('bgg.config.js'))

console.log('here is your config', JSON.stringify(config, null, 4))

bggGet(config)
