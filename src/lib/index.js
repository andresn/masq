import localforage from 'localforage'

let currentUserId = ''

/**
 * The library fakeAppStore aim is to be
 * used with the masq-app UI in order to simulate
 * a real masq store.
 */

/**
 @typedef masqDevice
 @type {Object}
 @property {string} name - The name of the device
 @property {string} color - The color indicator
 @property {boolean} enabled - The state indicator
 @property {boolean} new - True if last appaired device
 */

/**
 @typedef masqApp
 @type {Object}
 @property {string} name - The name of the application
 @property {string} color - The color indicator
 @property {string} description - The application description
 @property {boolean} enabled - True if application is synchronised
 @property {boolean} active - True if last appaired application
 @property {string} image - The link to the profil picture
 */

/**
 @typedef masqUser
 @type {Object}
 @property {string} username - The username
 @property {string} firstname - The firstname
 @property {string} lastname - The lastname
 @property {string} image - The link to the profil picture
 */

/**
 * Create a new user, appends the object to the userList.
 * A uuid is added to the received objectn this allows to
 * change the username without modifying the key inside the db.
 *
 * @param {masqUser} user - The user
 * @returns {Promise}
 *
 */
const createUser = async (user) => {
  let users = await localforage.getItem('userList')

  if (!users || users.length === 0) {
    console.log('userList is empty')
    users = []
  }

  // Add a uuid.
  user._id = generateUUID()
  users.push(user)

  await localforage.setItem('userList', users)
  console.log(`*** User ${user.username} has been stored : done ***`)

  await localforage.setItem(user._id, { appList: [], deviceList: [] })
  console.log(`*** Applist and device list have been created for ${user.username}.***`)
}

/**
 * Register a new device, appends the object to the deviceList.
 *
 * @param {masqDevice} device - The newly appaired device
 * @returns {Promise}
 *
 */
const addDevice = (device) => {
  if (!currentUserId || currentUserId === '') {
    return new Error('No logged user')
  }
  return localforage.getItem(currentUserId)
    .then(data => {
      data.deviceList.push(device)
      return localforage.setItem(currentUserId, data)
        .then(res => {
          console.log(`*** A new device/app has been added to device list.***`)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

const initDB = async () => {
  try {
    await localforage.config({
      driver: localforage.INDEXEDDB,
      name: 'masqApp-store',
      version: 1.0,
      storeName: 'masqAppStore', // Should be alphanumeric, with underscores.
      description: 'Store the applications data'
    })
  } catch (e) { console.log(e) }
}
initDB()
/**
 * Return the list of registered devices for the logged user.
 *
 * @returns {Promise<masqDevice[]>} - The list of devices
 *
 */
const getDeviceList = () => {
  console.log(currentUserId)
  if (!currentUserId || currentUserId === '') {
    console.log('No user is logged')
    return Promise.reject(new Error('No logged user'))
  }
  return localforage.getItem(currentUserId)
    .then(data => {
      return data.deviceList
    })
    .catch(err => console.log(err))
}

/**
 * Register a new application, appends the object to the appList.
 *
 * @param {masqApp} app - The newly appaired application
 * @returns {Promise}
 *
 */
const registerApp = (app) => {
  if (!currentUserId || currentUserId === '') {
    console.log('No user is logged')
    return new Error('No logged user')
  }
  return localforage.getItem(currentUserId)
    .then(data => {
      data.appList.push(app)
      return localforage.setItem(currentUserId, data)
        .then(res => {
          console.log(`*** A new app has been added to application list.***`)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

/**
 * Delete the application of the logged user.
 *
 * @param {int} index - The index of the application
 * @returns {Promise}
 *
 * TODO : change this in the future (do not use index)
 */
const deleteApp = (index) => {
  if (!currentUserId || currentUserId === '') {
    console.log('No user is logged')
    return new Error('No logged user')
  }
  return localforage.getItem(currentUserId)
    .then(data => {
      if (index > data.appList.length) {
        return new Error('The given index is out of range.')
      }
      // Retrieve the name, just to log after delete.
      let name = data.appList[index].name
      data.appList.splice(index, 1)
      return localforage.setItem(currentUserId, data)
        .then(res => {
          console.log(`*** The app ${name} has been removed from application list.***`)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

/**
 * Update the received application for the logged user.
 *
 * @param {masqApp} app - The updated app
 * @returns {Promise}
 */
const updateApp = (app) => {
  if (!currentUserId || currentUserId === '') {
    console.log('No user is logged')
    return new Error('No logged user')
  }
  return localforage.getItem(currentUserId)
    .then(data => {
      if (data.appList.length === 0) {
        console.log('No registered application.')
        return
      }
      let index = data.appList.findIndex(application => application.name === app.name)
      data.appList[index] = app
      return localforage.setItem(currentUserId, data)
        .then(res => {
          console.log(`Application ${app.name} has been updated. `)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

const updateDevice = async (device) => {
  if (!currentUserId || currentUserId === '') {
    return new Error('No logged user')
  }

  const data = await localforage.getItem(currentUserId)
  const index = data.deviceList.findIndex(dev => dev.name === device.name)
  data.deviceList[index] = device
  await localforage.setItem(currentUserId, data)
  console.log(`Device ${device.name} has been updated. `)
}

/**
 * Return the list of registered applications for the logged user.
 *
 * @returns {Promise<masqApp[]>} - The list of applications
 *
 */
const getApplicationList = () => {
  if (!currentUserId || currentUserId === '') {
    return Promise.reject(new Error('No logged user'))
  }
  return localforage.getItem(currentUserId)
    .then(data => {
      // console.log(data)
      return data.appList
    })
    .catch(err => console.log(err))
}

/**
 * Delete a user from the userList and the associated
 * key (id) which contains all the user data.
 * The user must be logged before.
 *
 * * @returns {Promise}
 */
const deleteUser = () => {
  if (!currentUserId || currentUserId === '') {
    console.log('No user is logged')
    return new Error('No logged user')
  }
  return localforage.getItem('userList')
    .then(users => {
      if (!users || users.length === 0) {
        console.log('userList is empty')
        return
      }
      let filtered = users.filter(usr => usr._id !== currentUserId)
      return localforage.setItem('userList', filtered)
        .then(res => {
          // Remove the user key which contains his data
          return localforage.removeItem(currentUserId)
            .then(res => {
              console.log(`*** User ${currentUserId} has been removed: done ***`)
              currentUserId = ''
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

/**
 * Update the current logged user info.
 *
 * @param {masqUser} user - The updated user
 * @returns {Promise}
 */
const updateUser = (user) => {
  if (!currentUserId || currentUserId === '') {
    console.log('No user is logged')
    return new Error('No logged user')
  }
  return localforage.getItem('userList')
    .then(users => {
      if (!users || users.length === 0) {
        console.log('userList is empty')
        return
      }
      // Get the user info object
      let index = users.findIndex(usr => usr._id === currentUserId)

      users[index] = user
      return localforage.setItem('userList', users)
        .then(res => {
          console.log(`User ${user.username} has been updated. `)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

/**
 * Return the list of registered users.
 *
 * @returns {Promise<masqUser[]>} - The list of users
 *
 */
const getUserList = async () => {
  const users = await localforage.getItem('userList')
  if (!users || users.length === 0) {
    console.log('userList is empty')
    return []
  }
  return users
}

/**
 * Login function, based on the username, the user id is
 * retrieved and stored in the *currentUserId* global variable.
 *
 * TODO : we need an authentication system based on BPKDF2.
 *
 * @param {string} username - The username must be the same as during the registration
 * @returns {Promise<masqApp[]>} - The list of applications
 *
 */
const signIn = (username) => {
  return localforage.getItem('userList')
    .then(users => {
      if (!users || users.length === 0) {
        console.log('userList is empty')
        return
      }
      let index = users.findIndex(usr => usr.username === username)
      if (index !== -1) {
        currentUserId = users[index]._id
        console.log(`Welcome ${username}, you are now logged.`)
      } else {
        console.log(`The user ${username} does not exist.`)
      }
      console.log('#######', currentUserId)
    })
    .catch(err => console.log(err))
}

/**
 * Logout function
 *
 */
const signOut = () => {
  currentUserId = ''
}

const getCurrentUserInfo = () => {
  if (!currentUserId || currentUserId === '') {
    console.log('No user is logged')
    return new Error('No logged user')
  }
  return localforage.getItem('userList')
    .then(users => {
      if (!users || users.length === 0) {
        console.log('userList is empty')
        return Promise.reject(new Error('No logged user'))
      }
      let index = users.findIndex(usr => usr._id === currentUserId)
      return users[index]
    })
    .catch(err => console.log(err))
}

/**
 * Clear the indexedDB.
 *
 */
const clearStorage = () => {
  return localforage.clear()
    .then(() => {
      console.log('Clear storage : done')
    })
    .catch(err => console.log(err))
}

/**
 * Clear the indexedDB.
 *
 * @returns {string} - The generated uuid
 */
const generateUUID = () => {
  return 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, (c) => {
    const r = Math.random() * 16 | 0
    // eslint-disable-next-line
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export {
  createUser,
  deleteUser,
  getUserList,
  clearStorage,
  signIn,
  signOut,
  getCurrentUserInfo,
  addDevice,
  updateDevice,
  getDeviceList,
  getApplicationList,
  registerApp,
  deleteApp,
  updateUser,
  updateApp
}
