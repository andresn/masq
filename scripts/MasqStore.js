
var dbUser = new PouchDB('MasqUser')
let dbApp = null

/**
 * @typedef {Object} database
 * @property {Object} db The requested db.
 * @property {string} appKey The uuid linked to the application.
 */

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
* a single document with objects. If no key is given, 'data'
* key is created or overwritten.
*
* @param {string} appName - The aaplication name.
* @param {any} appData - The data we will store.
* @param {string} - The key inside the document, "data" by default.
* @returns {Promise} - True if storage of data is successful.
*/
function addItemByAppName (appName, appData, key = 'data') {
  // select the rigth database, based on the uuid in MasqUser DB.

  return getDB(appName).then(DB => {
    return DB.db.get(DB.appKey).then(appDoc => {
      console.log('previous')
      console.log(appDoc)
      if (appDoc[key]) {
        console.log(`The key ${key} is already present inside the app ${appName}, we overwrite it.`)
        appDoc[key] = appData
      } else {
        console.log(`No data is stored, we create the key ${key} and put received data inside..`)
        appDoc[key] = appData
      }
      DB.db.put(appDoc)
    }).catch(err => console.log(err))
  }).catch(err => console.log(err))
}

/**
* Register an application.
* We store a specific key pair in 'applist' as :
* { nameOfApp : uuid }
* The uuid is generated in order to preserve privacy of the app name.
* Instead of storing in clear the app name, we store the associated uuid.

* @param {string} appName - The aaplication name.
* @returns {Promise} - True if resgistration is successful.
*/
function registerAppStore (appName) {
  console.log('register app')
  // select the rigth database, based on the uuid in MasqUser DB.
  return getUserId('pseudo', currentUser)
    .then(id => {
      // console.log(id)
      let db = new PouchDB(id)
      return db.get('applist').then(res => {
        console.log(res)
        console.log(res.list)
        if (!(res[appName])) {
          console.log(`The application ${appName} is added to the application list of the store.`)
          res[appName] = generateUUID()
          return db.put(res).then(() => {
            let data = {
              _id: res[appName],
              info: { owner: appName }
            }
            console.log(data)
            return db.put(data)
          }).catch(err => console.log(err))
        } else {
          console.log(`The application ${appName} is already registered to the store.`)
        }
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}

/**
* Add a user to the user DB and create a specific DB for him.
* We need some info about each users in order to list them
* in the login page, e.g. pseudo and profile photo.
* If no id is given, a uuid is generated.
* The created DB for user applications' data is named with
* the generated (or given) id.
* @param {string} pseudo - The pseudo of the user.
* @param {string} [id] - The id of the user (optionnal)
* @returns {Promise} - True if operations are successful.
*/
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
    info: 'This list contains all the registered app with their id.'
  }
  return dbApp.put(applist)
    .then(() => dbUser.put(user))
    .catch(err => console.log(err))
}

/**
* Store the current user as global variable.
* This feature will be improved by using an internal state db.
* @param {string} user - The pseudo of the user.
*/
function setCurrentUser (user, state) {
  state === true ? currentUser = user : currentUser = false
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

/**
* Get a pointer to the actual user data DB.
* Based on the given pseudo, we return the pouchDB db and
* the uuid associated to the user in order to get/set
* data inside.

* @param {string} appName - The aplication name.
* @return {database} - The requested database
*/
function getDB (appName) {
  if (!currentUser) {
    return Promise.reject(new Error(`No user is logged, please log.`))
  }
  return getUserId('pseudo', currentUser)
    .then(id => {
      console.log(id)
      let db = new PouchDB(id)
      return db.get('applist').then(res => {
        // console.log(res)
        // console.log(res.list)
        if (res[appName]) {
          // console.log(`The application ${appName} is registered in app list. Let us retrieve data.`)
          let ret = { db: db, appKey: res[appName] }
          // console.log(ret)
          return ret
          // return db.get(res[appName])
        } else {
          // console.log(`The application ${appName} is not registered, please register the app before using masq with it.`)
          return Promise.reject(new Error(`The application ${appName} is not registered, please register the app before using masq with it.`))
        }
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}

/**
* Return the document of the application
* @param {string} appName - The aplication name.
* @return {Object} - The application data
*/
function getAppData (appName) {
  return getDB(appName)
    .then(res => {
      // console.log(res)
      return res.db.get(res.appKey)
    }).catch(err => console.log(err))
}

/**
* Return specific data inside the application document.
* @param {string} appName - The aplication name.
* @param {string} key - The key inside the document ()
* @return {Object} - The data related to the given key
*/
function getSpecificKeyFromApp (appName, key) {
  return getDB(appName).then(DB => {
    return DB.db.get(DB.appKey).then(appDoc => {
      if (appDoc[key]) {
        return appDoc[key]
      } else {
        return Promise.reject(new Error(`The key ${key} does not exist for application ${appName}.`))
      }
    }).catch(err => console.log(err))
  }).catch(err => console.log(err))
}

/**
* Return the user document.
* @param {string} key - The key to search.
* @param {string} value - The value of the key.
* @return {Object} - The document associated to the user.
*/
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
