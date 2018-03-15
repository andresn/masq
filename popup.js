let curUser = null
/*
 * User interface :
 * Event and button : only for demo purpose
 */

document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('connect')
  if (el) {
    el.addEventListener('click', function (e) {
      connect()
    })
  }

  el = document.getElementById('register')
  if (el) {
    el.addEventListener('click', function (e) {
      register()
    })
  }
  el = document.getElementById('login')
  if (el) {
    el.addEventListener('click', function (e) {
      login()
    })
  }
  el = document.getElementById('logout')
  if (el) {
    el.addEventListener('click', function (e) {
      logout()
    })
  }
  el = document.getElementById('addData')
  if (el) {
    el.addEventListener('click', function (e) {
      addData()
    })
  }
  el = document.getElementById('getData')
  if (el) {
    el.addEventListener('click', function (e) {
      getData()
    })
  }
  el = document.getElementById('getSpecificKey')
  if (el) {
    el.addEventListener('click', function (e) {
      getSpecificKey()
    })
  }
  el = document.getElementById('getSpecificDoc')
  if (el) {
    el.addEventListener('click', function (e) {
      getSpecificDoc()
    })
  }
  el = document.getElementById('cryptoPouch')
  if (el) {
    el.addEventListener('click', function (e) {
      cryptoPouch()
    })
  }
  el = document.getElementById('registerApp')
  if (el) {
    el.addEventListener('click', function (e) {
      resgisterApp()
    })
  }
})

let key = null

const cryptoPouch = () => {

  // var encDB = new PouchDB('encryptedDB')
  // let password = 'hello'
  // encDB.crypto(password)
  // var todo = {
  //   _id: 'doc1',
  //   title: 'go shopping',
  //   completed: false
  // }
  // encDB.put(todo).then(res => {
  //   encDB.get('doc1').then(res => {
  //     console.log('Now we decrypt')
  //     console.log(res)
  //   })
  //     .catch(err => console.log(err))
  // })
  //   .catch(err => console.log(err))
}

const resgisterApp = () => {
  let appName = document.getElementById('appNameRegister').value
  registerAppStore(appName)
    .then(() => console.log(`${appName} has been succesfully registered`))
    .catch(err => console.log(err))
}

const connect = () => {
  console.log('connect please wait ...')
  let pass = document.getElementById('password').value
  let pseudo = document.getElementById('pseudo').value
  curUser = pseudo
  console.log(pass)
  connectStore(pass)
  derive(pass)
    .then(derivedKey => {
      console.log('Derived Key : ', derivedKey)
      key = derivedKey
    })
    .catch(err => console.log(err))
}
const register = () => {
  console.log('register please wait ...')
  let pseudo = document.getElementById('pseudo').value
  let pass = document.getElementById('passwordRegister').value
  addUser(pseudo, pass).then(res => {
    console.log(`Successfully stored ${pseudo}`)
  }).catch(err => console.log(err))
}
const login = () => {
  let pseudo = document.getElementById('pseudoLogin').value
  let pass = document.getElementById('passwordLogin').value
  document.getElementById('pseudoLogout').value = pseudo
  setCurrentUser(pseudo, pass, true)
  console.log(`Welcome ${pseudo}, you are now logged.`)
  // getUserId('pseudo', pseudo)
  // .then(res => c)
  // .catch(err => console.log(err))
}
const logout = () => {
  let pseudo = document.getElementById('pseudoLogout').value
  setCurrentUser(pseudo, false)
  console.log(`See you later ${pseudo}.`)
  // getUserId('pseudo', pseudo)
  // .then(res => console.log(`Welcome ${pseudo}, you are now logged.`))
  // .catch(err => console.log(err))
}
const addData = () => {
  let data = document.getElementById('inputSetData').value
  let appName = document.getElementById('appNameSetData').value
  let toStore = {
    _id: '1',
    score: data
  }
  console.log(`We are adding the item ${data} with the key data into the app ${appName}, the doc id is 1.`)

  addItemByAppName(appName, toStore)
    .then(res => {
      console.log('done')
      //     // getItemByKey('data')
      //     //   .then(res => console.log(res))
      //     //   .catch(err => console.log(err))
    }).catch(err => console.log(err))
}

const getData = () => {
  let appName = document.getElementById('appNameGetData').value
  getAllDoc(appName).then(res => {
    console.log(res)
  }).catch(err => console.log(err))
}
const getSpecificDoc = () => {
  let docName = document.getElementById('docGetData').value
  let appName = document.getElementById('appNameGetData').value
  getSingleDoc(appName, docName).then(res => {
    console.log(res)
  }).catch(err => console.log(err))
}
const getSpecificKey = () => {
  let key = document.getElementById('keyGetData').value
  let docName = document.getElementById('docGetData').value
  let appName = document.getElementById('appNameGetData').value
  getSpecificKeyFromApp(appName, docName, key).then(res => {
    console.log(res)
  }).catch(err => console.log(err))
}

const derive = (passPhrase) => {
  let iterations = 10000
  return MasqCrypto.utils.deriveKey(passPhrase, MasqCrypto.utils.toArray('theSalt'), iterations)
}
