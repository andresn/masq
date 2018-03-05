'use strict'

// var dbUser = new PouchDB('MasqUser')
// var dbData = new PouchDB('MasqData')

console.log('hello background')

dbData.changes({
  since: 'now',
  live: true,
  include_docs: true
}).on('change', updateDB)

function updateDB (doc) {
  console.log(doc)
  console.log('A change has been detected on DB !')
  console.log('Here call the sync function')
}

// let example = { name: 'Pascal', score: 15 }

// addItem(dbData, example.name, example).then(res => {
//   console.log(`Successfully stored ${example.name}`)
//   getItemByKey(dbData, 'Pascal')
//     .then(res => console.log(res))
//     .catch(err => console.log(err))
// })
//   .catch(err => console.log(err))

// getItemByKey(dbData, 'bob')
//   .then(res => console.log(res))
//   .catch(err => console.log(err))

// getItemByKey(dbData, 'alice')
//   .then(res => console.log(res))
//   .catch(err => console.log(err))

/**
 * We simulate a user who has connected through an app.
 * User : bob
 * Appname : QwantNote
 */
