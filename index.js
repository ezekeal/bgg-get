const nets = require('nets')
const parser = require('xml2js').parseString
const fs = require('fs')
const path = require('path')

const baseUrl = 'http://www.boardgamegeek.com/xmlapi2/thing?id='

module.exports = function bggGet (config) {
  const url = baseUrl + config.games.join(',') + '&stats=1'
  console.log(`
    requesting from:
    ${url}
  `)

  nets({ url: url, encoding: undefined }, (err, resp, body) => {
    console.log(`response received`)
    if (err) { console.error(err) }
    parser(body.toString(), (err, data) => {
      console.log(`finished parsing`)
      if (err) { console.error(err) }
      fs.writeFile(path.join(process.cwd(), 'bgg-data.json'), JSON.stringify(data, null, 2))
    })
  })
}
