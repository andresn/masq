
chrome.runtime.onConnect.addListener(function (port) {
  console.log('in listener')
  const err = MasqStore.init({
    syncserver: 'wss://sync-beta.qwantresearch.com:8080/',
    debug: true,
    autoregister: true,
    listener: port
  })
  if (err) {
    console.log(err)
  }
})
