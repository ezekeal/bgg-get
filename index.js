const nets = require('nets')
const parser = require('xml2js').parseString
const fs = require('fs')
const path = require('path')
const config = require('./bgg.config.js')

const baseUrl = 'http://www.boardgamegeek.com/xmlapi2/thing?id='

const url = baseUrl + config.games.join(',') + '&stats=1'

nets({ url: url, encoding: undefined }, (err, resp, body) => {
  if (err) { console.error(err) }
  parser(body.toString(), (err, data) => {
    if (err) { console.error(err) }
    fs.writeFile(path.join(__dirname, 'bgg-data.json'), JSON.stringify(data, null, 2))
  })
})
