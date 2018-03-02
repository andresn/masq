
var dbUser = new PouchDB('MasqUser')
let dbApp = null

let currentApp = null
let currentUser = null

/**
 * Add an object to the app database, this is
 * a single document with objects
 *
 */
function addItemByAppName (appName, data) {
  // select the rigth database, based on the uuid in MasqUser DB.
  return getUserByKey(currentUser)
    .then(res => {
      console.log(res.dbName)
      let db = new PouchDB(res.dbName)
      console.log(db)
      db.get('applist').then(list => {
        if (list.includes(appName)) {
          console.log(`The application ${appName} is already registered to the store.`)
        } else {
          console.log(`The application ${appName} is added to the application lsit of the store.`)
        }
      })
        .catch(err => console.log(err))
      // var item = {
      //   _id: id || new Date().toISOString(),
      //   key: value
      // }
      // return db.put(item)
    })
    // .then(res => {
    //   console.log('1.25', res)
    //   return res
    // })
    .catch(err => console.log(err))
}

function addUser (pseudo, id) {
  let user = {
    _id: id || generateUUID(),
    pseudo: pseudo
  }
  console.log(user)
  console.log(user._id)
  // user.dbName = user._id
  console.log(`Creation of a user ${pseudo} with id : ${user._id}`)
  console.log(`Creation of a database for ${pseudo} with id : ${user._id}`)
  dbApp = new PouchDB(user._id)
  let applist = {
    _id: 'applist',
    list: []
  }
  return dbApp.put(applist)
    .then(() => dbUser.put(user)
    )
    .catch(err => console.log(err))
}

function setCurrentUser (user, state) {
  state === true ? currentUser = user : currentUser = false
  // return getUserId('pseudo', user)
  //   .then(id => dbUser.get(id))
  //   .then(user => {
  //     console.log(user)
  //     user.currentUser = state
  //     console.log(user)
  //     return dbUser.put(user)
  //   })
  //   .catch(err => console.log(err))
}

function getAllItems (db) {
  db.allDocs({ include_docs: true, descending: true }, function (err, doc) {
    if (!err) {
      console.log(doc)
    }
  })
}

function getItemById (db, id) {
  db.get(id).then(function (doc) {
    // handle doc
    console.log(doc)
  }).catch(function (err) {
    console.log(err)
  })
}

function getItemByKey (user, appName, key) {
  return getUserByKey(user)
    .then(res => {
      console.log(res.dbName)
      let db = new PouchDB(res.dbName)
      console.log(db)

      return db.allDocs({ include_docs: true, descending: true })
    })
    .then(doc => {
      console.log(doc)
      // console.log(doc.rows)
      let res = doc.rows.filter(item => item.doc.key === key)
      // console.log(res[0].doc)
      return res[0].doc
    })
    .catch(err => console.log(err))
}

// function getUserByKey (pseudo) {
//   return getUserByKey(user)
//     .then(res => {
//       // console.log(res.dbName)
//       let db = new PouchDB(res.dbName)
//       // console.log(db)

//       return dbUser.allDocs({ include_docs: true, descending: true })
//     })
//     .then(doc => {
//       // console.log(doc.rows)
//       let res = doc.rows.filter(item => item.doc.key === key)
//       // console.log(res[0].doc)
//       return res[0].doc
//     })
//     .catch(err => console.log(err))
// }

function getUser (key, value) {
  return dbUser.allDocs({ include_docs: true, descending: true }).then(doc => {
    // console.log(doc.rows)
    let res = doc.rows.filter(item => item.doc[key] === value)
    // console.log(res[0].doc)
    return res[0].doc
  })
}

function getUserId (key, value) {
  return dbUser.allDocs({ include_docs: true, descending: true }).then(doc => {
    // console.log(doc.rows)
    let res = doc.rows.filter(item => item.doc[key] === value)
    // console.log(res[0].doc)
    return res[0].doc._id
  })
}

function sha256 (str) {
  // We transform the string into an arraybuffer.
  var buffer = new TextEncoder('utf-8').encode(str)
  return crypto.subtle.digest('SHA-256', buffer).then(function (hash) {
    return MasqCrypto.utils.bufferToHexString(hash)
  })
}

const generateUUID = () => {
  return 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// export {getItemByKey, addItem}
