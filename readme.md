# bgg-get

get the data for a list of games from board game geek and export it to a file

## how to use

create a `bgg.config.js`

```javascript
module.exports = {
  games: [
    '13', // catan
    '104710' // wiz-war
  ]
}
```

then:

```console
$ npm start
```
