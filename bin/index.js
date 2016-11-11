#! /usr/bin/env node
const { resolve, join } = require('path')
const bggGet = require('../index.js')
const [configFile, outFile] = process.argv.slice(2)
const xlsx = require('xlsx')
const fs = require('fs')

if (!configFile) {
  console.log('please specify a config file')
} else {
  const sheet = xlsx.readFile(resolve(configFile)).Sheets.Sheet1
  const config = xlsx.utils.sheet_to_json(sheet)
  console.log('config', config)
  bggGet(config).then(data => {
    if (!outFile) {
      fs.writeFile(join(process.cwd(), 'bgg-data.json'), JSON.stringify(data, null, 2))
    } else {
      fs.writeFile(resolve(outFile), JSON.stringify(data, null, 2))
    }
  })
}
