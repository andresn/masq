module.exports = function override (config, env) {
  // do stuff with the webpack config...
  config.target = 'electron-renderer'
  config.externals = {
    bindings: 'require("bindings")'
  }
  return config
}
