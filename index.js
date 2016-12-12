const parser = require('xml2js').parseString
const axios = require('axios')
const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities()

const baseUrl = 'http://www.boardgamegeek.com/xmlapi2/thing?id='

module.exports = function bggGet (games) {
  const url = `${baseUrl}${games.join(',')}`
  console.log(`requesting from: ${url}`)

  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(({data}) => {
        parser(data, (err, json) => {
          if (err) reject(err)
          else resolve(parseBggData(json))
        })
      })
  })
}

function parseBggData (data) {
  var games = data.items.item
  return games.map(({
    name, yearpublished, thumbnail, image, minplayers, maxplayers,
    minplaytime, maxplaytime, minage, description, link
  }) => {
    return {
      name: str(name),
      published: num(yearpublished),
      thumbnail: thumbnail[0],
      image: image[0],
      minPlayers: num(minplayers),
      maxPlayers: num(maxplayers),
      playtime: getPlaytime(num(minplaytime), num(maxplaytime)),
      minAge: num(minage),
      description: entities.decode(description[0]),
      categories: getLink(link, 'boardgamecategory')
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

function getPlaytime (minTime, maxTime) {
  let avgTime = (minTime + maxTime) / 2

  if (avgTime <= 15) {
    return 'short'
  } else if (avgTime <= 60) {
    return 'medium'
  } else {
    return 'long'
  }
}
