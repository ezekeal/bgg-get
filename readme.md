# bgg-get

[![Greenkeeper badge](https://badges.greenkeeper.io/ezekeal/bgg-get.svg)](https://greenkeeper.io/)

get the data for a list of games from board game geek and export it to a json file

## how to use

Install globally to use in the command line

```console
$ npm i -g bgg-get
```

Create an xlsx file with a list of board game geek id numbers
you can get the id number from the link to the game's page

For example the id for Catan is 13
https://boardgamegeek.com/boardgame/13/catan

then run in the console

```console
$ bgg-get --sheet=[sheet name] \
--column=[column name] \
--src=[path to xlsx file] \
--out=[path to save your file]
```

### example
```console
$ bgg-get --sheet='Sheet1' \
--column='id' \
--src=./bgg.xlsx \
--out=./my-data.json
```
