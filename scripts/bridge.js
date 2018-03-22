/**
 * This contenet script aim is to be a bridge
 * between the web application and the Masq Store.
 * In order to communicate postMessage is used by end points.
 * web app <---> bridge <-----> background
 */

console.log('I am the bridge between the web app and Masq Store')
var port = chrome.runtime.connect()

window.addEventListener('message', event => {
  // We only accept messages from ourselves
  if (event.source !== window) { return }

  // if (event.data.method === 'set') {
  //   console.log('set request received')
  //   // return { data: 'ok' }
  //   return setItem()
  // }
  /**
 *  Receive messages from webpage.
 *  Transfer them to background.
 */

  if (event.data.method || event.data.type) {
    console.log('Content script - receive on window : ')
    // console.log(`\tReceive a ${event.data} request.`)
    console.log(event.data)
    console.log(port)
    if (port) {
      port.postMessage(event.data)
    }
  }
  // switch (event.data.type) {
  //   case 'handshake':
  //     //   console.log("Content script sends this message to backgound: " + event.data)
  //     // port.postMessage(event.data)
  //     break
  //   case 'initDB':
  //     // port.postMessage(event.data)
  //     break
  //   case 'set':
  //     console.log(event.data)
  //     // port.postMessage(event.data)
  //     break
  //   case 'get':
  //     console.log(event.data)
  //     // port.postMessage(event.data)
  //     break

  //   default:
  //     break
  // }
  // console.log("Content script received: " + event.data.text);
}, false)

/**
 *  Receive messages from background.
 *  Transfer them to webpage.
 */
port.onMessage.addListener(function (event) {
  console.log('Content script - receive on port : ')
  console.log(`\tBackground sends a ${event} request to the application.`)
  window.postMessage(
    event,
    '*')
  // if (event.to && (event.to == 'webpage')) {
  //   switch (event.type) {
  //     case 'handshake_ack':
  //       // port.postMessage(event);
  //       window.postMessage(
  //         event,
  //         '*')
  //       break
  //     case 'set_ack':
  //       // port.postMessage(event);
  //       window.postMessage(
  //         event,
  //         '*')
  //       break
  //     case 'get_ack':
  //       // port.postMessage(event);
  //       window.postMessage(
  //         event,
  //         '*')
  //       break

  //     default:
  //       break
  //   }
})
