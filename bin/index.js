#! /usr/bin/env node
const { resolve, join } = require('path')
const bggGet = require('../index.js')
const {sheet, column, src, out} = require('yargs').argv
const xlsx = require('xlsx')
const fs = require('fs')

const TIME_BETWEEN_REQUESTS = 500
const MAX_GAMES_PER_REQUEST = 10

if (!(sheet, column, src)) {
  console.log('please specify sheet, column, src')
} else {
  const file = xlsx.readFile(resolve(src)).Sheets[sheet]
  const config = xlsx.utils.sheet_to_json(file)
  const games = config.map(game => game[column])
  const chunks = Math.ceil(games.length / MAX_GAMES_PER_REQUEST)

  let requests = []

  console.log(`requesting ${chunks} game groups for ${games.length} games`)
  for(let i = 0; i < chunks; i++){
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`sending request ${i + 1}`)
        bggGet(games.splice(0, MAX_GAMES_PER_REQUEST)).then(data => {
          console.log(`recieved game group ${i + 1}`)
          resolve(data)
        }, err => {
          console.error('bggGet error' + err)
          reject(err)
        })
      }, i * TIME_BETWEEN_REQUESTS )
    })
    requests.push(promise)
  }

  Promise.all(requests)
    .then(responses => {
      let games = responses.reduce((all, curr) => all.concat(curr), [])
      if (!out) {
        out = join(process.cwd(), 'bgg-data.json')
      }
      console.log(`writing file to: ${out}`)
      fs.writeFile(resolve(out), JSON.stringify(games, null, 2))
    }, err => console.err('all error: ' + err) )
}
