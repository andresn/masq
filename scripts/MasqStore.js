
var dbUser = new PouchDB('MasqUser')
let dbApp = null

let currentApp = null
let currentUser = null

dbUser.changes({
  since: 'now',
  live: true,
  include_docs: true
}).on('change', updateDB)

function updateDB (doc) {
  console.log(doc)
  console.log('A change has been detected on DB !')
  console.log('Here call the sync function')
}

/**
 * Add an object to the app database, this is
 * a single document with objects
 *
 */
function addItemByAppName (appName, appData) {
  // select the rigth database, based on the uuid in MasqUser DB.
  getUserId('pseudo', currentUser).then(id => {
    // console.log(id)
    let db = new PouchDB(id)
    db.get('applist').then(res => {
      sha256(appName).then(hash => {
        db.get(hash).then(res => {
          console.log('previous')
          console.log(res)
          res.score = appData
          db.put(res).then(() => {
          }).catch(err => console.log(err))
        }).catch(err => console.log(err))
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  }).catch(err => console.log(err))
}
/**
 * Register an application
 *
 */
function registerAppStore (appName) {
  console.log('register app')
  // select the rigth database, based on the uuid in MasqUser DB.
  getUserId('pseudo', currentUser)
    .then(id => {
      // console.log(id)
      let db = new PouchDB(id)
      db.get('applist').then(res => {
        console.log(res)
        console.log(res.list)
        if (!(res.list.includes(appName))) {
          console.log(`The application ${appName} is added to the application list of the store.`)
          res.list.push(appName)
          db.put(res).then(() => {
            sha256(appName).then(hash => {
              let data = {
                _id: hash,
                data: { owner: appName }
              }
              console.log(data)
              db.put(data).then(() => {
                console.log('done')
              }).catch(err => console.log(err))
            }).catch(err => console.log(err))
          }).catch(err => console.log(err))
        } else {
          console.log(`The application ${appName} is already registered to the store.`)
        }
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}

function addUser (pseudo, id) {
  let user = {
    _id: id || generateUUID(),
    pseudo: pseudo
  }
  // console.log(user)
  // console.log(user._id)
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

function getFullDataFromApp (appName) {
  getUserId('pseudo', currentUser)
    .then(id => {
      // console.log(id)
      let db = new PouchDB(id)
      db.get('applist').then(res => {
        // console.log(res)
        // console.log(res.list)
        if (res.list.includes(appName)) {
          // console.log(`The application ${appName} is registered in app list. Let us retrieve data.`)
          sha256(appName).then(hash => {
            db.get(hash).then(appDoc => {
              console.log(appDoc)
            }).catch(err => console.log(err))
          }).catch(err => console.log(err))
        } else {
          console.log(`The application ${appName} is not registered, please register the app before using masq with it.`)
        }
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}
function getSpecificKeyFromApp (appName, key) {
  getUserId('pseudo', currentUser)
    .then(id => {
      // console.log(id)
      let db = new PouchDB(id)
      db.get('applist').then(res => {
        // console.log(res)
        // console.log(res.list)
        if (res.list.includes(appName)) {
          console.log(`The application ${appName} is registered in app list. Let us retrieve data.`)
          sha256(appName).then(hash => {
            db.get(hash).then(appDoc => {
              if (appDoc[key]) {
                console.log(appDoc[key])
              } else {
                console.log('This key does not exist')
              }
              // console.log(appDoc)
            }).catch(err => console.log(err))
          }).catch(err => console.log(err))
        } else {
          console.log(`The application ${appName} is not registered, please register the app before using masq with it.`)
        }
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
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
  return dbUser.allDocs({ include_docs: true }).then(doc => {
    let res = doc.rows.filter(item => item.doc[key] === value)
    // console.log(res[0].doc)
    return res[0].doc
  })
}

function getUserId (key, value) {
  return dbUser.allDocs({ include_docs: true }).then(doc => {
    // console.log(doc)
    // console.log(doc.rows)
    let res = doc.rows.filter(item => item.doc[key] === value)
    // console.log(res[0].doc)
    // console.log(res[0].doc._id)
    // console.log(res[0])
    return res[0].doc._id
  })
}

function sha256 (str) {
  // We transform the string into an arraybuffer.
  var buffer = new TextEncoder('utf-8').encode(str)
  return crypto.subtle.digest('SHA-1', buffer).then(function (hash) {
    return hex(hash)
  })
}

function hex (buffer) {
  var hexCodes = []
  var view = new DataView(buffer)
  for (var i = 0; i < view.byteLength; i += 4) {
    // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
    var value = view.getUint32(i)
    // toString(16) will give the hex representation of the number without padding
    var stringValue = value.toString(16)
    // We use concatenation and slice for padding
    var padding = '00000000'
    var paddedValue = (padding + stringValue).slice(-padding.length)
    hexCodes.push(paddedValue)
  }

  // Join all the hex strings into one
  return hexCodes.join('')
}

const generateUUID = () => {
  return 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// export {getItemByKey, addItem}
