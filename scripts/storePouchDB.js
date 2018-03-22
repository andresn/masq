
let dbUser = new PouchDB('DBUser')
let dbDataManagement = new PouchDB('MasqDataManagement')
checkUserList()

let dbApp = null

/**
 * @typedef {Object} database
 * @property {Object} db The requested db.
 * @property {string} appKey The uuid linked to the application.
 */

let currentApp = null
let currentUser = null
let currentPass = null

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
function addItemByAppName (appName, doc) {
  // select the rigth database, based on the uuid in MasqUser DB.

  return getDB(appName, doc).then(db => {
    return db.put(doc)
    // .then(appDoc => {
    //   console.log('previous')
    //   console.log(appDoc)
    //   if (appDoc[key]) {
    //     console.log(`The key ${key} is already present inside the app ${appName}, we overwrite it.`)
    //     appDoc[key] = appData
    //   } else {
    //     console.log(`No data is stored, we create the key ${key} and put received data inside..`)
    //     appDoc[key] = appData
    //   }
    //   DB.db.put(appDoc)
    // }).catch(err => console.log(err))
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
      // db.crypto(currentPass)
      return dbDataManagement.get(id).then(res => {
        console.log(res)
        console.log('1.2')
        console.log(res.appList)
        let index = res.appList.findIndex(item => item.name === appName)
        if (index === -1) {
          console.log(`The application ${appName} is added to the application list of the store.`)
          let app = {
            name: appName,
            id: generateUUID()
          }
          res.appList.push(app)
          return dbDataManagement.put(res).then(() => {
            let dbApp = new PouchDB(app.id)
            // dbApp.crypto(pass)
            let appContent = {
              _id: 'info',
              info: 'This document has been generated automatically.'
            }
            return dbApp.put(appContent)
          })
        } else {
          console.log(`The application ${appName} is already registered to the store.`)
        }
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}

function checkUserList () {
  dbUser.get('users')
    .then(res => {
      console.log('UserList is already initalised. ')
    })
    .catch(err => {
      if (err.message === 'missing') {
        console.log('The user list is empty, we create the key users')
        let users = {
          _id: 'users',
          userList: []
        }
        dbUser.put(users).then(res => {
          console.log('Intialisation of db user : ok.')
        }).catch(err => console.log(err))
      }
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
* @param {string} pass - The passphrase used to encrypt data.
* @param {string} [id] - The id of the user (optionnal)
* @returns {Promise} - True if operations are successful.
*/
function addUser (pseudo, pass, id) {
  return dbUser.get('users')
    .then(doc => {
      let user = {
        _id: id || generateUUID(),
        pseudo: pseudo
      }
      doc.userList.push(user)
      console.log(doc.userList)
      // console.log(user._id)
      // user.dbName = user._id
      console.log(`Creation of a user ${pseudo} with id : ${user._id}`)
      console.log(`Creation of a document with id ${user._id} inside db MasqDataManagement for ${pseudo}.`)
      // dbApp = new PouchDB(user._id)
      // dbApp.crypto(pass)
      let dataManagement = {
        _id: user._id,
        info: 'This document contains all the references to the user applications. ',
        appList: []
      }
      // dbApp = new PouchDB(user._id)
      // dbApp.crypto(pass)
      // let applist = {
      //   _id: 'applist',
      //   info: 'This list contains all the registered app with their id.'
      // }
      return dbUser.put(doc)
        .then(() => dbDataManagement.put(dataManagement))
        .catch(err => console.log(err))
    })
}

/**
* Store the current user as global variable.
* This feature will be improved by using an internal state db.
* @param {string} user - The pseudo of the user.
* @param {string} pass - The passphrase used to encrypt data.
* @param {boolean} state - The state (true (login) |false (logout))
*/
function setCurrentUser (user, pass, state) {
  state === true ? currentUser = user : currentUser = false
  state === true ? currentPass = pass : currentPass = null
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
* Set the passphrase of the user to make a connection to his
* DB. For now we are using a global variable, but we need to change it.

* @param {string} pass - The passphrase.
*/
function connectStore (pass) {
  currentPass = pass
}

/**
* Get a pointer to the actual user data DB.
* Based on the given pseudo, we return the pouchDB db and
* the uuid associated to the user in order to get/set
* data inside.

* @param {string} appName - The aplication name.
* @return {database} - The requested database
*/
// function getDB (appName) {
//   if (!currentUser) {
//     return Promise.reject(new Error(`No user is logged, please log.`))
//   }
//   return getUserId('pseudo', currentUser)
//     .then(id => {
//       console.log(id)
//       let db = new PouchDB(id)
//       db.crypto(currentPass)
//       return db.get('applist').then(res => {
//         console.log(res)
//         // console.log(res.list)
//         if (res[appName]) {
//           // console.log(`The application ${appName} is registered in app list. Let us retrieve data.`)
//           let ret = { db: db, appKey: res[appName] }
//           // console.log(ret)
//           return ret
//           // return db.get(res[appName])
//         } else {
//           // console.log(`The application ${appName} is not registered, please register the app before using masq with it.`)
//           return Promise.reject(new Error(`The application ${appName} is not registered, please register the app before using masq with it.`))
//         }
//       }).catch(err => console.log(err))
//     }).catch(err => console.log(err))
// }
/**
* Get a pointer to the actual user data DB.
* Based on the given pseudo, we return the pouchDB db and
* the uuid associated to the user in order to get/set
* data inside.

* @param {string} appName - The aplication name.
* @return {object} - The requested database
*/
function getDB (appName) {
  if (!currentUser) {
    return Promise.reject(new Error(`No user is logged, please log.`))
  }
  return getUserId('pseudo', currentUser)
    .then(id => {
      // console.log(id)
      return dbDataManagement.get(id)
    })
    .then(apps => {
      // console.log(apps.appList)
      let index = apps.appList.findIndex(item => item.name === appName)
      if (index !== -1) {
        let userDBInfo = apps.appList[index]
        console.log(`The user ${currentUser} has a db for the application ${appName} with the id ${userDBInfo.id}.`)
        let db = new PouchDB(userDBInfo.id)
        return db
      } else {
        // console.log(`The application ${appName} is not registered, please register the app before using masq with it.`)
        return Promise.reject(new Error(`The application ${appName} is not registered, please register the app before using masq with it.`))
      }
      // db
      // db.crypto(currentPass)
      // return db.get('applist').then(res => {
      //   console.log(res)
      //   // console.log(res.list)
      //   if (res[appName]) {
      //     // console.log(`The application ${appName} is registered in app list. Let us retrieve data.`)
      //     let ret = { db: db, appKey: res[appName] }
      //     // console.log(ret)
      //     return ret
      // return db.get(res[appName])
      // } else {
      //   // console.log(`The application ${appName} is not registered, please register the app before using masq with it.`)
      //   return Promise.reject(new Error(`The application ${appName} is not registered, please register the app before using masq with it.`))
      // }
    }).catch(err => console.log(err))
}

/**
* Return all documents of the application, the logged user is
* retrieved from the global variable, see login function.
* @param {string} appName - The aplication name.
* @return {Object} - The application data (document)
*/
function getAllDoc (appName) {
  return getDB(appName).then(db => {
    // console.log(db)
    return db.allDocs({ include_docs: true }).then(doc => {
      // console.log(doc)
      return doc.rows
    })
  })
}

/**
* Return a single document of the application, the logged user is
* retrieved from the global variable, see login function.
* @param {string} appName - The aplication name.
* @param {string} id - The document id.
* @return {Object} - The application data (document)
*/
function getSingleDoc (appName, id) {
  return getDB(appName).then(db => {
    return db.get(id)
  }).catch(err => console.log(err))
}

/**
* Return specific key inside the application document.
* @param {string} appName - The aplication name.
* @param {string} document - The document id.
* @param {string} key - The key inside the document.
* @return {Object} - The data related to the given key
*/
function getSpecificKeyFromApp (appName, doc, key) {
  return getSingleDoc(appName, doc).then(appDoc => {
    if (appDoc[key]) {
      return appDoc[key]
    } else {
      return Promise.reject(new Error(`The key ${key} does not exist for application ${appName}.`))
    }
  }).catch(err => console.log(err))
}

/**
* Return the user document.
* @param {string} key - The key to search.
* @param {string} value - The value of the key.
* @return {Object} - The document associated to the user.
*/
function getUser (key, value) {
  return dbUser.get('users').then(doc => {
    // console.log(doc)
    let res = doc.userList.filter(item => item[key] === value)
    console.log(res)
    if (res.length === 1) {
      return res[0]
    } else {
      return Promise.reject(new Error(`This user does not exist, please register before.`))
    }
  })
}

/**
* Get user list.
* @return {array} - The list of the registered users.
*/
function getUserList () {
  return dbUser.get('users').then(doc => {
    // console.log(doc)
    let res = doc.userList.map(item => item.pseudo)
    return res
  }).catch(err => console.log(err))
}
/**
* Get user apps list. The user has to log before.
* @return {array} - The document associated to the user.
*/
function getUserApp () {
  getUserId('pseudo', pseudo)
    .then(id => {
      console.log(id)
      let db = new PouchDB(id)
      db.get('applist').then(doc => {
        console.log(Object.keys(doc).filter(item => (item !== '_rev' && item !== 'list' && item !== '_id')))
      })
    }).catch(err => console.log(err))
}

function getUserId (key, value) {
  return getUser(key, value)
    .then(doc => doc._id)
    .catch(err => console.log(err))
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
let docs = [
  // {
  //   _id: 'fubar',
  //   _rev: '1-59f4a085ca9649d88fd36b4cadf592eb',
  //   score: 111
  // }, {
  {
    _id: 'fubar',
    _rev: '1-073128b8a6be488bae14a999b83c487d"',
    score: 222
  }, {
    _id: 'fubar',
    _rev: '3-c9b5295df79249e3bea25890ecae291a',
    score: 333
  }
]

async function testHyper () {
  let db = hyperdb('./dbUser', {valueEncoding: 'utf-8'})
  let put1 = await db.put('/users', 'users')
  console.log('Initial put : 1')
  console.log(put1)
  let get1 = await db.get('/users')
  console.log(get1)
}

async function test2 () {
  let db = new PouchDB('test2')
  let put1 = await db.put({ _id: '1', score: 111 })
  console.log('Initial put : 1')
  console.log(put1)
  let get1 = await db.get('1')
  console.log(get1)
  get1.score = 222
  console.log('Put 2')
  let put2 = await db.put(get1)
  console.log(put2)
  let get2 = await db.get('1')
  console.log(get2)
  get2.score = 333
  console.log('Put 3')
  let put3 = await db.put(get2)
  console.log(put3)
  let get3 = await db.get('1')
  console.log(get3)
  get3.score = 444
  get3._rev = '8-y'
  console.log('Put 4 : force rev 8')
  let put4 = await db.put(get3, {force: true})
  console.log(put4)
}

async function testPutOne () {
  let db = new PouchDB('test')
  let put1 = await db.put({ _id: '1', score: 111 })
  console.log('Initial put : 1')
  console.log(put1)
  let get1 = await db.get('1')
  console.log(get1)
}

async function testPutOthers () {
  let db = new PouchDB('test')
  let get1 = await db.get('1')
  console.log(get1)
  get1.score = 222
  console.log('Put 2')
  let put2 = await db.put(get1)
  console.log(put2)
  let get2 = await db.get('1')
  console.log(get2)
  get2.score = 333
  console.log('Put 3')
  let put3 = await db.put(get2)
  console.log(put3)
  let get3 = await db.get('1')
  console.log(get3)
}

async function testOverwrite () {
  let db = new PouchDB('test')
  // let put1 = await db.put({ _id: '1', score: 111 })
  // console.log('Initial put : 1')
  // console.log(put1)
  let get1 = await db.get('1')
  console.log(get1)
  get1.score = 222
  get1._rev = '1-4254d81e0e0544bcb12615cc4728aa2e'
  console.log('Put 2')
  let put2 = await db.put(get1, {force: true})
  console.log(put2)
  let get2 = await db.get('1')
  console.log(get2)
  get2.score = 333
  console.log('Put 3')
  let put3 = await db.put(get2)
  console.log(put3)
  let get3 = await db.get('1')
  console.log(get3)
  get3.score = 444
  get3._rev = '8-y'
  console.log('Put 4 : force rev 8')
  let put4 = await db.put(get3, {force: true})
  console.log(put4)
}

// async function bulkInsert () {
//   // given
//   var docs = [
//     {
//       _id: 'fubar',
//       _rev: '1-a1',
//       score: 111
//     }, {
//       _id: 'fubar',
//       _rev: '1-a1',
//       score: 222
//     }, {
//       _id: 'fubar',
//       _rev: '2-b2',
//       _revisions: { start: 2, ids: ['b2', 'a1'] }
//     }
//   ]
//   let db = new PouchDB('testBulk')
//   try {
//     let res = await db.bulkDocs({ docs: docs })
//     console.log(res)
//   } catch (e) {
//     console.log(e)
//   }
// }
