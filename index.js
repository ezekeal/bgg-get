const parser = require('xml2js').parseString
const axios = require('axios')

const baseUrl = 'http://www.boardgamegeek.com/xmlapi2/thing?id='

module.exports = function bggGet (config) {
  const games = config.map(game => game['id'])
  const url = `${baseUrl}${games.join(',')}&stats=1`
  console.log(`requesting from: ${url}`)

  return new Promise((fulfill, reject) => {
    axios.get(url)
      .then(({data}) => {
        parser(data, (err, json) => {
          if (err) reject(err)
          else fulfill(parseBggData(json))
        })
      })
  })
}

function parseBggData (data) {
  var games = data.items.item
  return games.map(({
    name, yearpublished, thumbnail, image, minplayers, maxplayers,
    minplaytime, maxplaytime, minage, description, link, statistics
  }) => {
    return {
      name: str(name),
      published: str(yearpublished),
      thumbnail: thumbnail[0],
      image: image[0],
      minPlayers: num(minplayers),
      maxPlayers: num(maxplayers),
      minPlaytime: num(minplaytime),
      maxPlaytime: num(maxplaytime),
      minAge: num(minage),
      description: description[0],
      categories: getLink(link, 'boardgamecategory'),
      mechanics: getLink(link, 'boardgamemechanic'),
      rank: statistics[0].ratings[0].ranks[0].rank[0].$.value,
      rating: statistics[0].ratings[0].average[0].$.value
    }
  })
}

function str (field) {
  return field[0].$.value
}

function num (field) {
  return parseInt(field[0].$.value)
}

function getLink (data, type) {
  return data
    .filter(val => val.$.type === type)
    .map(val => val.$.value)
}
