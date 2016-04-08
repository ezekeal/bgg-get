# bgg-get

get the data for a list of games from board game geek and export it to a file

## how to use

Install globally to use in the command line

```console
$ npm i -g
```

create a `bgg.config.js` with a list of board game geek ids

```javascript
module.exports = {
  games: [
    '13', // catan
    '104710' // wiz-war
  ]
}
```

then run in the console

```console
$ bgg-get
```
