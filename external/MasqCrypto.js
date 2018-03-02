(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.MasqCrypto = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AES = exports.aesModes = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils.js');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// @ts-check

/**
 * Print error messages
 *
 * @param {Error} err Error message
 */
var logFail = function logFail(err) {
  console.log(err);
};

var aesModes = {
  CBC: 'aes-cbc',
  GCM: 'aes-gcm',
  CTR: 'aes-ctr'
};

var acceptedMode = ['aes-cbc', 'aes-gcm', 'aes-ctr'];

var acceptedKeySize = [128, 192, 256];

/**
 * Decrypt data with AES-GCM cipher
 *
 * @param {ArrayBuffer} data - Data to decrypt
 * @param {ArrayBuffer} key - The AES key as raw data. 128 or 256 bits
 * @param {Object} cipherContext - The AES cipher parameters
 * @param {ArrayBuffer} cipherContext.iv - The IV
 * @param {string} cipherContext.name - The encryption mode
 * @param {ArrayBuffer} [cipherContext.additionalData] - The non-secret authenticated data (only aes-gcm)
 * @param {ArrayBuffer} [cipherContext.counter] - The counter used for aes-ctr mode
 * @returns {ArrayBuffer} - The decrypted buffer
 */
var decryptBuffer = function decryptBuffer(data, key, cipherContext) {
  // TODO: test input params
  return crypto.subtle.decrypt(cipherContext, key, data).then(function (result) {
    return new Uint8Array(result);
  }).catch(logFail);
};

/**
 * Encrypt data with AES-GCM cipher
 *
 * @param {ArrayBuffer} data - Data to encrypt
 * @param {ArrayBuffer} key - The AES CryptoKey
 * @param {Object} cipherContext - The AES cipher parameters
 * @param {ArrayBuffer} cipherContext.iv - The IV
 * @param {string} cipherContext.name - The encryption mode
 * @param {ArrayBuffer} [cipherContext.additionalData] - The non-secret authenticated data (only aes-gcm)
 * @param {ArrayBuffer} [cipherContext.counter] - The counter used for aes-ctr mode
 * @returns {ArrayBuffer} - The encrypted buffer
 */
var encryptBuffer = function encryptBuffer(data, key, cipherContext) {
  return crypto.subtle.encrypt(cipherContext, key, data).then(function (result) {
    return new Uint8Array(result);
  }).catch(logFail);
};
/**
 * AES cipher
 * @constructor
 * @param {Object} params - The AES cipher parameters
 * @param {string} [params.mode] - The encryption mode : aes-gcm, aes-cbc
 * @param {ArrayBuffer} [params.key] - The AES CryptoKey
 * @param {number} [params.keySize] - The key size in bits (128, 192, 256)
 * @param {number} [params.iv] - The IV, if not provided it will be generated randomly
 * @param {string} [params.additionalData] - The authenticated data, only for aes-gcm mode.
 */

var AES = function () {
  function AES(params) {
    _classCallCheck(this, AES);

    this.mode = params.mode || 'aes-gcm';
    this.keySize = params.keySize || 128;
    this.IV = params.iv || null;
    this.key = params.key || null;
    this.length = params.length || 128;
    this.additionalData = params.additionalData || '';
  }

  _createClass(AES, [{
    key: 'checkRaw',


    /**
    * Check the received key format (CryptoKey or raw key).
    * If raw, import the key and return the CryptoKey
    *
    * @param {obj} obj - Save this in obj
    * @returns {CryptoKey|arrayBuffer} - The CryptoKey
    */
    value: function checkRaw(obj, key) {
      return new Promise(function (resolve, reject) {
        if (key instanceof Uint8Array) {
          obj.importKeyRaw(key).then(resolve).catch(function (err) {
            return console.log(err);
          });
        } else {
          resolve(key);
        }
      });
    }

    /**
    * Transform a raw key into a CryptoKey
    *
    * @param {arrayBuffer} key - The key we want to import
    * @returns {CryptoKey} - The CryptoKey
    */

  }, {
    key: 'importKeyRaw',
    value: function importKeyRaw(key) {
      return crypto.subtle.importKey('raw', key, {
        name: this.mode
      }, true, ['encrypt', 'decrypt']);
    }
  }, {
    key: 'decrypt',


    /**
    * Decrypt the given input. All cipher context infomrmation
    * have been initialized at object creation (default or parameter)
    *
    * @param {object} input - The ciphertext and associated decryption data
    * @param {hexString} input.ciphertext - The ciphertext
    * @param {hexString} input.iv - The IV used at encryption
    * @param {hexString} [input.version] - The additionnal data for aes-gcm mode
    * @returns {string} - The decrypted input
    */
    value: function decrypt(input) {
      // Prepare context, all modes have at least one property : ciphertext
      var context = {};
      var cipherContext = {};
      var self = this;
      context.ciphertext = input.hasOwnProperty('ciphertext') ? utils.hexStringToBuffer(input.ciphertext) : '';
      if (this.mode === 'aes-gcm') {
        context.iv = input.hasOwnProperty('iv') ? utils.hexStringToBuffer(input.iv) : '';
        // aes-gcm may have an additional authenticated data property (optional)
        context.additionalData = input.hasOwnProperty('version') ? utils.toArray(input.version) : [];
        // Prepare cipher context, depends on cipher mode
        cipherContext.name = this.mode;
        cipherContext.iv = context.iv;
        cipherContext.additionalData = context.additionalData;
        // This function test the given key and return the Cryptokey
        return this.checkRaw(self, this.key).then(function (key) {
          return decryptBuffer(context.ciphertext, key, cipherContext);
        }).then(function (res) {
          return utils.toString(res);
        }).catch(logFail);
      } else if (this.mode === 'aes-cbc') {
        // IV is 128 bits long === 16 bytes
        context.iv = input.hasOwnProperty('iv') ? utils.hexStringToBuffer(input.iv) : '';
        // Prepare cipher context, depends on cipher mode
        cipherContext.name = this.mode;
        cipherContext.iv = context.iv;
        return this.checkRaw(self, this.key).then(function (key) {
          return decryptBuffer(context.ciphertext, key, cipherContext);
        }).then(function (res) {
          return utils.toString(res);
        }).catch(logFail);
      } else if (this.mode === 'aes-ctr') {
        // IV is 128 bits long === 16 bytes
        context.iv = input.hasOwnProperty('iv') ? utils.hexStringToBuffer(input.iv) : '';
        // Prepare cipher context, depends on cipher mode
        cipherContext.name = this.mode;
        cipherContext.counter = context.iv;
        cipherContext.length = this.length;
        return this.checkRaw(self, this.key).then(function (key) {
          return decryptBuffer(context.ciphertext, key, cipherContext);
        }).then(function (res) {
          return utils.toString(res);
        }).catch(logFail);
      } else {
        console.log('The mode ' + this.mode + ' is not yet supported');
      }
    }

    /**
    * Eecrypt the given input. All cipher context information
    * have been initialized at object creation (as default or as parameter)
    * If the input is an ohas to be stringified
    *
    * @param {string} input - The plaintext
    * @returns {object} - The encrypted input with additional cipher information (e.g. iv)
    */

  }, {
    key: 'encrypt',
    value: function encrypt(input) {
      // all modes have at least the plaintext
      var context = {};
      var cipherContext = {};
      var self = this;
      context.plaintext = utils.toArray(input);
      if (this.mode === 'aes-gcm') {
        // IV is 96 bits long === 12 bytes
        context.iv = this.iv || window.crypto.getRandomValues(new Uint8Array(12));
        context.additionalData = utils.toArray(this.additionalData);
        // Prepare cipher context, depends on cipher mode
        cipherContext.name = this.mode;
        cipherContext.iv = context.iv;
        // This function test the given key and return the Cryptokey
        cipherContext.additionalData = context.additionalData;
        return this.checkRaw(self, this.key).then(function (key) {
          return encryptBuffer(context.plaintext, key, cipherContext);
        }).then(function (result) {
          return {
            ciphertext: utils.bufferToHexString(result),
            iv: utils.bufferToHexString(context.iv),
            version: utils.toString(context.additionalData)
          };
        }).catch(logFail);
      } else if (this.mode === 'aes-cbc') {
        // IV is 128 bits long === 16 bytes
        context.iv = this.iv || window.crypto.getRandomValues(new Uint8Array(16));
        // Prepare cipher context, depends on cipher mode
        cipherContext.name = this.mode;
        cipherContext.iv = context.iv;
        return this.checkRaw(self, this.key).then(function (key) {
          return encryptBuffer(context.plaintext, key, cipherContext);
        }).then(function (result) {
          return {
            ciphertext: utils.bufferToHexString(result),
            iv: utils.bufferToHexString(context.iv)
          };
        }).catch(logFail);
      } else if (this.mode === 'aes-ctr') {
        // IV is 128 bits long === 16 bytes
        context.iv = this.iv || window.crypto.getRandomValues(new Uint8Array(16));
        // Prepare cipher context, depends on cipher mode
        cipherContext.name = this.mode;
        cipherContext.counter = context.iv;
        cipherContext.length = this.length;
        return this.checkRaw(self, this.key).then(function (key) {
          return encryptBuffer(context.plaintext, key, cipherContext);
        }).then(function (result) {
          return {
            ciphertext: utils.bufferToHexString(result),
            iv: utils.bufferToHexString(context.iv)
          };
        }).catch(logFail);
      } else {
        console.log('The mode ' + this.mode + ' is not yet supported');
      }
    }

    /**
     * Generate an AES key based on the cipher mode and keysize
     * Cipher mode and keys are initialized at cipher AES instance creation.
     *
     * @returns {CryptoKey} - The generated AES key.
     */

  }, {
    key: 'genAESKey',
    value: function genAESKey() {
      return crypto.subtle.generateKey({
        name: this.mode || 'aes-gcm',
        length: this.keySize || 128
      }, true, ['decrypt', 'encrypt']);
    }
  }, {
    key: 'additionalData',
    get: function get() {
      return this._additionalData;
    },
    set: function set(newAdditionalData) {
      if (typeof newAdditionalData === 'string') {
        this._additionalData = newAdditionalData;
      } else {
        console.log("You did not provide a string for additional data, default value is ''.");
        this._additionalData = '';
      }
    }
  }, {
    key: 'key',
    get: function get() {
      return this._key;
    },
    set: function set(newKey) {
      this._key = newKey;
    }
  }, {
    key: 'mode',
    get: function get() {
      return this._mode;
    },
    set: function set(newMode) {
      if (acceptedMode.includes(newMode)) {
        this._mode = newMode;
      } else {
        console.log(newMode + ' is not accepted.');
        console.log('Accepted modes are ' + acceptedMode.join(', '));
        console.log('Default mode is \'aes-gcm\'.');
        this._mode = 'aes-gcm';
      }
    }
  }, {
    key: 'keySize',
    get: function get() {
      return this._keySize;
    },
    set: function set(newKeySize) {
      if (acceptedKeySize.includes(newKeySize)) {
        this._keySize = newKeySize;
      } else {
        console.log(newKeySize + ' is not accepted.');
        console.log('Accepted keySize are ' + acceptedKeySize.join(', '));
        console.log('Default keySize is \'128\'.');
        this._keySize = 128;
      }
    }
  }]);

  return AES;
}();

exports.default = AES;
exports.aesModes = aesModes;
exports.AES = AES;
},{"./utils.js":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Print error messages
 *
 * @param {Error} err Error message
 */
var logFail = function logFail(err) {
  console.log(err);
  console.log(err.code);
};

var acceptedCurve = ['P-256', 'P-384', 'P-521'];
var acceptedAlgName = ['ECDH', 'ECDSA'];

/**
 * Elliptic Curve
 * @constructor
 * @param {Object} params - The EC cipher parameters
 * @param {string} params.name - The algorithm name ("ECDH" or "ECDSA")
 * @param {string} [params.hash] - The hash function (sign/verif). Default : "SHA-256", possible values: "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
 * @param {string} [params.curve] - The elliptic curve ("P-256", "P-384", or "P-521")
 */

var EC = function () {
  function EC(params) {
    _classCallCheck(this, EC);

    this.name = params.name || 'ECDH';
    this.curve = params.curve || 'P-384';
    this.hash = params.hash || 'SHA-256';
    this.publicKey = null;
    this.privateKey = null;
  }

  _createClass(EC, [{
    key: 'genECKeyPair',


    /**
     * Generate an EC key pair and store them in the class instance
     *
     * @returns {CryptoKey} - The generated EC key Pair as CryptoKey
     */
    value: function genECKeyPair() {
      var self = this;
      return crypto.subtle.generateKey({
        name: this.name,
        namedCurve: this.curve
      }, false, this.name === 'ECDH' ? ['deriveKey', 'deriveBits'] : ['sign', 'verify']).then(function (cryptoKey) {
        self.publicKey = cryptoKey.publicKey;
        self.privateKey = cryptoKey.privateKey;
        return cryptoKey;
      }).catch(function (err) {
        switch (err.code) {
          case 9:
            console.log('WebCrypto API error :\n - During ECDH key generation: given namedCurve parameter is not accepted');
            break;
          default:
            console.log(err);
            break;
        }
      });
    }

    /**
    * Check the received key format (CryptoKey or raw key).
    * If raw, import the key and return the CryptoKey
    *
    * @param {obj} obj - Save this in obj
    * @param {CryptoKey|arrayBuffer} key - The key
    * @returns {CryptoKey|arrayBuffer} - The CryptoKey
    */

  }, {
    key: 'checkRaw',
    value: function checkRaw(obj, key) {
      return new Promise(function (resolve, reject) {
        if (key instanceof Uint8Array) {
          obj.importKeyRaw(key).then(resolve).catch(logFail);
        } else {
          resolve(key);
        }
      });
    }

    /**
     * Derive  key (AES-GCM by default) during ECDH key exchange
     * The private EC key is already in EC.privateKey
     *
     * @param {Cryptokey|arrayBuffer} publicKey Public Key of the sender (verified)
     * @param {string} type Key type of the derived key (aes-cbc, aes-gcm)
     * @param {int} keySize Key size of the derived key in bits (128, 192, 256)
     * @param {CryptoKey} [privateKey] The EC private key if not generated via genECKeyPair
     * @returns {arrayBuffer} The derived key
     */

  }, {
    key: 'deriveKeyECDH',
    value: function deriveKeyECDH(publicKey) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'aes-gcm';

      var _this = this;

      var keySize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 128;
      var privateKey = arguments[3];

      return this.checkRaw(this, publicKey).then(function (key) {
        return crypto.subtle.deriveKey({
          name: _this.name,
          public: key
        }, privateKey || _this.privateKey, {
          name: type,
          length: keySize
        }, true, ['decrypt', 'encrypt']);
      }).then(function (derivedKey) {
        return crypto.subtle.exportKey('raw', derivedKey);
      }).then(function (rawKey) {
        return new Uint8Array(rawKey);
      }).catch(logFail);
    }

    /**
     * Export raw key
     * The public key is already stored in EC.publicKey
     *
     * {CryptoKey} key - The key that we extract raw value (available in EC.publicKey)
     * @returns {arrayBuffer} The raw key
     */

  }, {
    key: 'exportKeyRaw',
    value: function exportKeyRaw(key) {
      return crypto.subtle.exportKey('raw', key || this.publicKey).then(function (rawKey) {
        return new Uint8Array(rawKey);
      }).catch(logFail);
    }

    /**
     * Import raw key
     *
     * @param {CryptoKey} key - The key that we extract raw value
     * @param {String} curve - The elliptic curve used at the imported key creation
     * @returns {Promise} - The CryptoKey
     */

  }, {
    key: 'importKeyRaw',
    value: function importKeyRaw(key, curve, algName) {
      return crypto.subtle.importKey('raw', key, {
        name: algName || this.name,
        namedCurve: curve || this.curve
      }, true, []);
    }

    /**
     * Sign data
     * EC private key could be already stored in EC.privateKey
     *
     * @param {arrayBuffer} data - The data to be signed
     * @param {CryptoKey} privateKey - The private key (if nt sotred in EC class)
     * @param {String} [hash] - The hash function used for signature. Default 'SHA-256'
     * @returns {arrayBuffer} - The signature
     */

  }, {
    key: 'signEC',
    value: function signEC(data, privateKey, hash) {
      return crypto.subtle.sign({
        name: 'ECDSA',
        hash: { name: hash || this.hash }
      }, privateKey || this.privateKey, data).then(function (signature) {
        return new Uint8Array(signature);
      }).catch(logFail);
    }

    /**
     * Verif signature
     *
     * @param {CryptoKey} publicKey - The public RSA Key used to verify data signature
     * @param {arrayBuffer} signature - The signature
     * @param {arrayBuffer} signedData - Signed data
     * @param {String} [hash] - The hash function used for signature. Default 'SHA-256'
     * @returns {boolean} - Result
     */

  }, {
    key: 'verifEC',
    value: function verifEC(publicKey, signature, signedData, hash) {
      return crypto.subtle.verify({
        name: 'ECDSA',
        hash: { name: hash || this.hash }
      }, publicKey, signature, signedData);
    }
  }, {
    key: 'curve',
    get: function get() {
      return this._curve;
    },
    set: function set(newCurve) {
      if (acceptedCurve.includes(newCurve)) {
        this._curve = newCurve;
      } else {
        console.log(newCurve + ' is not accepted.');
        console.log('Accepted curves are ' + acceptedCurve.join(', '));
        this._curve = newCurve;
      }
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    },
    set: function set(newName) {
      if (acceptedAlgName.includes(newName)) {
        this._name = newName;
      } else {
        console.log(newName + ' is not accepted.');
        console.log('Accepted names are ' + acceptedAlgName.join(', '));
        this._name = newName;
      }
    }
  }]);

  return EC;
}();

exports.default = EC;
exports.EC = EC;
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Print error messages
 *
 * @param {Error} err Error message
 */
var logFail = function logFail(err) {
  console.log(err);
};

/**
 * RSA
 * @constructor
 * @param {Object} params - The RSA cipher parameters
 * @param {string} params.hash The hash function ("SHA-256", "SHA-384", "SHA-512")
 * @param {string} params.name The algorithm name  ("RSA-PSS")
 * @param {string} params.modulusLength - The modulus length (4096 default)
 */

var RSA = function () {
  function RSA(params) {
    _classCallCheck(this, RSA);

    this.modulusLength = params.modulusLength || 4096;
    this.hash = params.hash || 'SHA-256';
    this.name = params.name || 'RSA-PSS';
    this.publicKey = null;
    this.private = null;
  }

  _createClass(RSA, [{
    key: 'genRSAKeyPair',


    /**
     * Generate a RSA-PSS key pair for signature and verification
     *
     * @param {int} modulusLength - The modulus length (1024, 2048 or 4096)
     * @returns {Promise} - The RSA key pair : publicKey and privateKey
     */
    value: function genRSAKeyPair() {
      var modulusLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4096;

      var self = this;
      return crypto.subtle.generateKey({
        name: 'RSA-PSS',
        modulusLength: modulusLength, // can be 1024, 2048, or 4096
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: {
          name: 'SHA-256'
        }
      }, false, ['sign', 'verify']).then(function (cryptoKey) {
        self.publicKey = cryptoKey.publicKey;
        self.privateKey = cryptoKey.privateKey;
        return cryptoKey;
      }).catch(logFail);
    }

    /**
     * Verif data (e.g. raw EC public key in case of ECDH)
     *
     * @param {CryptoKey} publicKey - The public RSA Key used to verify data signature
     * @param {arrayBuffer} signature - The signature
     * @param {arrayBuffer} signedData - Signed data
     * @returns {boolean} - Result
     */

  }, {
    key: 'verifRSA',
    value: function verifRSA(publicKey, signature, signedData) {
      return crypto.subtle.verify({
        name: 'RSA-PSS',
        saltLength: 16
      }, publicKey, signature, signedData);
    }

    /**
     * Sign data (e.g. raw EC public key in case of ECDH)
     * RSA private key is already stored in RSA.privateKey
     *
     * @param {arrayBuffer} data - The data to be signed
     * @param {CryptoKey} privateKey - The private key (if nt sotred in RSA class)
     * @returns {arrayBuffer} - The signature
     */

  }, {
    key: 'signRSA',
    value: function signRSA(data, privateKey) {
      return crypto.subtle.sign({
        name: 'RSA-PSS',
        saltLength: 16
      }, privateKey || this.privateKey, data).then(function (signature) {
        return new Uint8Array(signature);
      }).catch(logFail);
    }

    /**
     * Import RSA-PSS public key
     *
     * @param {jwk} key - The key (jwk format) that we want to import
     * @param {jwk} name - The algorithm name of the imported RSA key (default : "RSA-PSS")
     * @param {jwk} hash - The hash name of the imported RSA key (default : "SHA-256")
     * @returns {Promise} - The imported key as CryptoKey
     */

  }, {
    key: 'importRSAPubKeyRaw',
    value: function importRSAPubKeyRaw(key, name, hash) {
      return crypto.subtle.importKey('jwk', {
        kty: key.kty,
        e: key.e,
        n: key.n,
        alg: key.alg,
        ext: key.ext
      }, {
        name: name || 'RSA-PSS',
        hash: {
          name: hash || 'SHA-256'
        }
      }, false, ['verify']);
    }

    /**
     * Export RSA-PSS public raw key
     *
     * @param {CryptoKey} key - The key that we extract raw value
     * @returns {Promise} - The raw key
     */

  }, {
    key: 'exportRSAPubKeyRaw',
    value: function exportRSAPubKeyRaw(key, format) {
      return crypto.subtle.exportKey(format || 'jwk', key || this.publicKey);
    }
  }, {
    key: 'publicKey',
    get: function get() {
      return this._publicKey;
    }

    /**
     * Set RSA-PSS keys
     *
     * @param {Cryptokey} keys - The public RSA key
     */
    ,
    set: function set(newPublicKey) {
      this._publicKey = newPublicKey;
    }
  }, {
    key: 'privateKey',
    get: function get() {
      return this._privateKey;
    },
    set: function set(newPrivateKey) {
      this._privateKey = newPrivateKey;
    }
  }]);

  return RSA;
}();

exports.default = RSA;
exports.RSA = RSA;
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utils = undefined;

var _EC = require('./EC');

Object.keys(_EC).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EC[key];
    }
  });
});

var _AES = require('./AES');

Object.keys(_AES).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AES[key];
    }
  });
});

var _RSA = require('./RSA');

Object.keys(_RSA).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RSA[key];
    }
  });
});

var _AES2 = _interopRequireDefault(_AES);

var _EC2 = _interopRequireDefault(_EC);

var _RSA2 = _interopRequireDefault(_RSA);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var _fastJsonPatch = require('fast-json-patch');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.utils = utils;


var aesCTR = function aesCTR() {
  // EXAMPLE
  var data = {
    POI_1: 'Tour eiffel',
    POI_2: 'Bastille',
    POI_3: 'Cafeteria'

    // We generate a 128 bits key with crypto random
  };var AESKey = window.crypto.getRandomValues(new Uint8Array(16));
  // We create an AES object with some paramters
  var myAES = new _AES2.default({
    mode: _AES.aesModes.CTR,
    key: AESKey,
    keySize: 128
  });
  console.log(myAES);
  myAES.encrypt(JSON.stringify(data)).then(function (encryptedJSON) {
    console.log(encryptedJSON);
    return myAES.decrypt(encryptedJSON);
  }).then(function (decryptedJSON) {
    return console.log(decryptedJSON);
  }).catch(function (err) {
    return console.log(err);
  });
};

var ecdh = function ecdh() {
  var aliceEC = new _EC2.default({});
  var bobEC = new _EC2.default({});

  var generateECKeys = function generateECKeys() {
    console.log('Generation of ephemeral EC keys for Alice and Bob');
    return Promise.all([aliceEC.genECKeyPair(), bobEC.genECKeyPair({})]);
  };

  var exportRawKeys = function exportRawKeys() {
    console.log('Extraction of raw EC public keys for Alice and Bob');
    return Promise.all([bobEC.exportKeyRaw(), aliceEC.exportKeyRaw()]);
  };

  // Used to store the raw EC public Keys
  var alice = {};
  var bob = {};

  console.log('Start test');

  generateECKeys().then(exportRawKeys).then(function (rawKeys) {
    bob.ECRawPubKey = rawKeys[0];
    alice.ECRawPubKey = rawKeys[1];
    return bobEC.importKeyRaw(alice.ECRawPubKey);
  }).then(function (AliceECPubKey) {
    console.log('Bob : public key verification :  ok');
    // Bob : with Alice Public EC key and his EC private key, we derive a symmetric key
    console.log("Bob derives a symmetric key with Alice's Public EC key and his EC private key ");
    return bobEC.deriveKeyECDH(AliceECPubKey, 'aes-gcm', 128);
  }).then(function (derivedSymmetricAESKeyBob) {
    aliceEC.importKeyRaw(bob.ECRawPubKey).then(function (BobECPubKey) {
      aliceEC.deriveKeyECDH(BobECPubKey, 'aes-gcm', 128).then(function (derivedSymmetricAESKeyAlice) {
        console.log(derivedSymmetricAESKeyAlice);
        console.log(derivedSymmetricAESKeyBob);
      }).catch(function (err) {
        return console.log(err);
      });
    }).catch(function (err) {
      return console.log(err);
    });
  }).catch(function (err) {
    return console.log(err);
  });
};
// ecdh()
// console.log("hello src index")
// var document = { firstName: "Albert", contactDetails: { phoneNumbers: [] } };
// var operation = { op: "replace", path: "/firstName", value: "Joachim" };
// document = applyOperation(document, operation).newDocument;
// console.log(document)
},{"./AES":1,"./EC":2,"./RSA":3,"./utils":5,"fast-json-patch":10}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Convert ascii to ArrayBufffer
 * ex : "bonjour" -> Uint8Array [ 98, 111, 110, 106, 111, 117, 114 ]
 *
 * @param {String} str
 * @returns {ArrayBuffer}
 */
var toArray = function toArray() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var chars = [];
  for (var i = 0; i < str.length; ++i) {
    chars.push(str.charCodeAt(i));
  }
  return new Uint8Array(chars);
};

/**
* Convert ArrayBufffer to hex String
* ex : Uint8Array [ 17, 161, 178 ] -> '11a1b2'
*
* @param {ArrayBuffer} bytes
* @returns {String}
*/
var bufferToHexString = function bufferToHexString(bytes) {
  if (!bytes) {
    return null;
  }
  var hexBytes = [];

  for (var i = 0; i < bytes.length; ++i) {
    var byteString = bytes[i].toString(16);
    if (byteString.length < 2) {
      byteString = '0' + byteString;
    }
    hexBytes.push(byteString);
  }

  return hexBytes.join('');
};

/**
 * Convert ArrayBufffer to ascii
 * ex : Uint8Array [ 98, 111, 110, 106, 111, 117, 114 ] -> "bonjour"
 *
 * @param {ArrayBuffer} bytes
 * @returns {String}
 */
var toString = function toString(bytes) {
  return String.fromCharCode.apply(null, new Uint8Array(bytes));
};

/**
 * Convert hex String to ArrayBufffer
 * ex : '11a1b2' -> Uint8Array [ 17, 161, 178 ]
 *
 * @param {String} hexString
 * @returns {ArrayBuffer}
 */
var hexStringToBuffer = function hexStringToBuffer(hexString) {
  if (hexString.length % 2 !== 0) {
    throw new Error('Invalid hexString');
  }
  var arrayBuffer = new Uint8Array(hexString.length / 2);

  for (var i = 0; i < hexString.length; i += 2) {
    var byteValue = parseInt(hexString.substr(i, 2), 16);
    if (isNaN(byteValue)) {
      throw new Error('Invalid hexString');
    }
    arrayBuffer[i / 2] = byteValue;
  }

  return arrayBuffer;
};

/**
 * Generate a PBKDF2 derived key based on user given passPhrase
 *
 * @param {string | arrayBuffer} passPhrase The passphrase that is used to derive the key
 * @param {arrayBuffer} [salt] The passphrase length
 * @returns {Promise}   A promise that contains the derived key
 */
var deriveKey = function deriveKey(passPhrase, salt) {
  var iterations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10000;

  // Always specify a strong salt 
  if (iterations < 10000) {
    console.log('The iteration number is less than 10000, increase it !');
  }

  return crypto.subtle.importKey('raw', typeof passPhrase === 'string' ? toArray(passPhrase) : passPhrase, 'PBKDF2', false, ['deriveBits', 'deriveKey']).then(function (baseKey) {
    return crypto.subtle.deriveBits({
      name: 'PBKDF2',
      salt: salt || new Uint8Array([]),
      iterations: iterations,
      hash: 'sha-256'
    }, baseKey, 128);
  }).then(function (derivedKey) {
    return new Uint8Array(derivedKey);
  }).catch(function (err) {
    return console.log(err);
  });
};

// Generate a random string using the Webwindow API instead of Math.random
// (insecure)
var randomString = function randomString() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 18;

  var charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  if (window.crypto && window.crypto.getRandomValues) {
    var values = new Uint32Array(length);
    window.crypto.getRandomValues(values);
    for (var i = 0; i < length; i++) {
      result += charset[values[i] % charset.length];
    }
  } else {
    console.log("Your browser can't generate secure random numbers");
  }
  return result;
};

exports.default = toArray;
exports.toArray = toArray;
exports.bufferToHexString = bufferToHexString;
exports.toString = toString;
exports.hexStringToBuffer = hexStringToBuffer;
exports.deriveKey = deriveKey;
exports.randomString = randomString;
},{}],6:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":7,"./lib/keys.js":8}],7:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],8:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],9:[function(require,module,exports){
var equalsOptions = { strict: true };
var _equals = require('deep-equal');
var areEquals = function (a, b) {
    return _equals(a, b, equalsOptions);
};
var helpers_1 = require('./helpers');
exports.JsonPatchError = helpers_1.PatchError;
exports.deepClone = helpers_1._deepClone;
/* We use a Javascript hash to store each
 function. Each hash entry (property) uses
 the operation identifiers specified in rfc6902.
 In this way, we can map each patch operation
 to its dedicated function in efficient way.
 */
/* The operations applicable to an object */
var objOps = {
    add: function (obj, key, document) {
        obj[key] = this.value;
        return { newDocument: document };
    },
    remove: function (obj, key, document) {
        var removed = obj[key];
        delete obj[key];
        return { newDocument: document, removed: removed };
    },
    replace: function (obj, key, document) {
        var removed = obj[key];
        obj[key] = this.value;
        return { newDocument: document, removed: removed };
    },
    move: function (obj, key, document) {
        /* in case move target overwrites an existing value,
        return the removed value, this can be taxing performance-wise,
        and is potentially unneeded */
        var removed = getValueByPointer(document, this.path);
        if (removed) {
            removed = helpers_1._deepClone(removed);
        }
        var originalValue = applyOperation(document, { op: "remove", path: this.from }).removed;
        applyOperation(document, { op: "add", path: this.path, value: originalValue });
        return { newDocument: document, removed: removed };
    },
    copy: function (obj, key, document) {
        var valueToCopy = getValueByPointer(document, this.from);
        // enforce copy by value so further operations don't affect source (see issue #177)
        applyOperation(document, { op: "add", path: this.path, value: helpers_1._deepClone(valueToCopy) });
        return { newDocument: document };
    },
    test: function (obj, key, document) {
        return { newDocument: document, test: areEquals(obj[key], this.value) };
    },
    _get: function (obj, key, document) {
        this.value = obj[key];
        return { newDocument: document };
    }
};
/* The operations applicable to an array. Many are the same as for the object */
var arrOps = {
    add: function (arr, i, document) {
        if (helpers_1.isInteger(i)) {
            arr.splice(i, 0, this.value);
        }
        else {
            arr[i] = this.value;
        }
        // this may be needed when using '-' in an array
        return { newDocument: document, index: i };
    },
    remove: function (arr, i, document) {
        var removedList = arr.splice(i, 1);
        return { newDocument: document, removed: removedList[0] };
    },
    replace: function (arr, i, document) {
        var removed = arr[i];
        arr[i] = this.value;
        return { newDocument: document, removed: removed };
    },
    move: objOps.move,
    copy: objOps.copy,
    test: objOps.test,
    _get: objOps._get
};
/**
 * Retrieves a value from a JSON document by a JSON pointer.
 * Returns the value.
 *
 * @param document The document to get the value from
 * @param pointer an escaped JSON pointer
 * @return The retrieved value
 */
function getValueByPointer(document, pointer) {
    if (pointer == '') {
        return document;
    }
    var getOriginalDestination = { op: "_get", path: pointer };
    applyOperation(document, getOriginalDestination);
    return getOriginalDestination.value;
}
exports.getValueByPointer = getValueByPointer;
/**
 * Apply a single JSON Patch Operation on a JSON document.
 * Returns the {newDocument, result} of the operation.
 * It modifies the `document` and `operation` objects - it gets the values by reference.
 * If you would like to avoid touching your values, clone them:
 * `jsonpatch.applyOperation(document, jsonpatch._deepClone(operation))`.
 *
 * @param document The document to patch
 * @param operation The operation to apply
 * @param validateOperation `false` is without validation, `true` to use default jsonpatch's validation, or you can pass a `validateOperation` callback to be used for validation.
 * @param mutateDocument Whether to mutate the original document or clone it before applying
 * @return `{newDocument, result}` after the operation
 */
function applyOperation(document, operation, validateOperation, mutateDocument) {
    if (validateOperation === void 0) { validateOperation = false; }
    if (mutateDocument === void 0) { mutateDocument = true; }
    if (validateOperation) {
        if (typeof validateOperation == 'function') {
            validateOperation(operation, 0, document, operation.path);
        }
        else {
            validator(operation, 0);
        }
    }
    /* ROOT OPERATIONS */
    if (operation.path === "") {
        var returnValue = { newDocument: document };
        if (operation.op === 'add') {
            returnValue.newDocument = operation.value;
            return returnValue;
        }
        else if (operation.op === 'replace') {
            returnValue.newDocument = operation.value;
            returnValue.removed = document; //document we removed
            return returnValue;
        }
        else if (operation.op === 'move' || operation.op === 'copy') {
            returnValue.newDocument = getValueByPointer(document, operation.from); // get the value by json-pointer in `from` field
            if (operation.op === 'move') {
                returnValue.removed = document;
            }
            return returnValue;
        }
        else if (operation.op === 'test') {
            returnValue.test = areEquals(document, operation.value);
            if (returnValue.test === false) {
                throw new exports.JsonPatchError("Test operation failed", 'TEST_OPERATION_FAILED', 0, operation, document);
            }
            returnValue.newDocument = document;
            return returnValue;
        }
        else if (operation.op === 'remove') {
            returnValue.removed = document;
            returnValue.newDocument = null;
            return returnValue;
        }
        else if (operation.op === '_get') {
            operation.value = document;
            return returnValue;
        }
        else {
            if (validateOperation) {
                throw new exports.JsonPatchError('Operation `op` property is not one of operations defined in RFC-6902', 'OPERATION_OP_INVALID', 0, operation, document);
            }
            else {
                return returnValue;
            }
        }
    } /* END ROOT OPERATIONS */
    else {
        if (!mutateDocument) {
            document = helpers_1._deepClone(document);
        }
        var path = operation.path || "";
        var keys = path.split('/');
        var obj = document;
        var t = 1; //skip empty element - http://jsperf.com/to-shift-or-not-to-shift
        var len = keys.length;
        var existingPathFragment = undefined;
        var key = void 0;
        var validateFunction = void 0;
        if (typeof validateOperation == 'function') {
            validateFunction = validateOperation;
        }
        else {
            validateFunction = validator;
        }
        while (true) {
            key = keys[t];
            if (validateOperation) {
                if (existingPathFragment === undefined) {
                    if (obj[key] === undefined) {
                        existingPathFragment = keys.slice(0, t).join('/');
                    }
                    else if (t == len - 1) {
                        existingPathFragment = operation.path;
                    }
                    if (existingPathFragment !== undefined) {
                        validateFunction(operation, 0, document, existingPathFragment);
                    }
                }
            }
            t++;
            if (Array.isArray(obj)) {
                if (key === '-') {
                    key = obj.length;
                }
                else {
                    if (validateOperation && !helpers_1.isInteger(key)) {
                        throw new exports.JsonPatchError("Expected an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index", "OPERATION_PATH_ILLEGAL_ARRAY_INDEX", 0, operation.path, operation);
                    } // only parse key when it's an integer for `arr.prop` to work
                    else if (helpers_1.isInteger(key)) {
                        key = ~~key;
                    }
                }
                if (t >= len) {
                    if (validateOperation && operation.op === "add" && key > obj.length) {
                        throw new exports.JsonPatchError("The specified index MUST NOT be greater than the number of elements in the array", "OPERATION_VALUE_OUT_OF_BOUNDS", 0, operation.path, operation);
                    }
                    var returnValue = arrOps[operation.op].call(operation, obj, key, document); // Apply patch
                    if (returnValue.test === false) {
                        throw new exports.JsonPatchError("Test operation failed", 'TEST_OPERATION_FAILED', 0, operation, document);
                    }
                    return returnValue;
                }
            }
            else {
                if (key && key.indexOf('~') != -1) {
                    key = helpers_1.unescapePathComponent(key);
                }
                if (t >= len) {
                    var returnValue = objOps[operation.op].call(operation, obj, key, document); // Apply patch
                    if (returnValue.test === false) {
                        throw new exports.JsonPatchError("Test operation failed", 'TEST_OPERATION_FAILED', 0, operation, document);
                    }
                    return returnValue;
                }
            }
            obj = obj[key];
        }
    }
}
exports.applyOperation = applyOperation;
/**
 * Apply a full JSON Patch array on a JSON document.
 * Returns the {newDocument, result} of the patch.
 * It modifies the `document` object and `patch` - it gets the values by reference.
 * If you would like to avoid touching your values, clone them:
 * `jsonpatch.applyPatch(document, jsonpatch._deepClone(patch))`.
 *
 * @param document The document to patch
 * @param patch The patch to apply
 * @param validateOperation `false` is without validation, `true` to use default jsonpatch's validation, or you can pass a `validateOperation` callback to be used for validation.
 * @param mutateDocument Whether to mutate the original document or clone it before applying
 * @return An array of `{newDocument, result}` after the patch
 */
function applyPatch(document, patch, validateOperation, mutateDocument) {
    if (mutateDocument === void 0) { mutateDocument = true; }
    if (validateOperation) {
        if (!Array.isArray(patch)) {
            throw new exports.JsonPatchError('Patch sequence must be an array', 'SEQUENCE_NOT_AN_ARRAY');
        }
    }
    if (!mutateDocument) {
        document = helpers_1._deepClone(document);
    }
    var results = new Array(patch.length);
    for (var i = 0, length_1 = patch.length; i < length_1; i++) {
        results[i] = applyOperation(document, patch[i], validateOperation);
        document = results[i].newDocument; // in case root was replaced
    }
    results.newDocument = document;
    return results;
}
exports.applyPatch = applyPatch;
/**
 * Apply a single JSON Patch Operation on a JSON document.
 * Returns the updated document.
 * Suitable as a reducer.
 *
 * @param document The document to patch
 * @param operation The operation to apply
 * @return The updated document
 */
function applyReducer(document, operation) {
    var operationResult = applyOperation(document, operation);
    if (operationResult.test === false) {
        throw new exports.JsonPatchError("Test operation failed", 'TEST_OPERATION_FAILED', 0, operation, document);
    }
    return operationResult.newDocument;
}
exports.applyReducer = applyReducer;
/**
 * Validates a single operation. Called from `jsonpatch.validate`. Throws `JsonPatchError` in case of an error.
 * @param {object} operation - operation object (patch)
 * @param {number} index - index of operation in the sequence
 * @param {object} [document] - object where the operation is supposed to be applied
 * @param {string} [existingPathFragment] - comes along with `document`
 */
function validator(operation, index, document, existingPathFragment) {
    if (typeof operation !== 'object' || operation === null || Array.isArray(operation)) {
        throw new exports.JsonPatchError('Operation is not an object', 'OPERATION_NOT_AN_OBJECT', index, operation, document);
    }
    else if (!objOps[operation.op]) {
        throw new exports.JsonPatchError('Operation `op` property is not one of operations defined in RFC-6902', 'OPERATION_OP_INVALID', index, operation, document);
    }
    else if (typeof operation.path !== 'string') {
        throw new exports.JsonPatchError('Operation `path` property is not a string', 'OPERATION_PATH_INVALID', index, operation, document);
    }
    else if (operation.path.indexOf('/') !== 0 && operation.path.length > 0) {
        // paths that aren't empty string should start with "/"
        throw new exports.JsonPatchError('Operation `path` property must start with "/"', 'OPERATION_PATH_INVALID', index, operation, document);
    }
    else if ((operation.op === 'move' || operation.op === 'copy') && typeof operation.from !== 'string') {
        throw new exports.JsonPatchError('Operation `from` property is not present (applicable in `move` and `copy` operations)', 'OPERATION_FROM_REQUIRED', index, operation, document);
    }
    else if ((operation.op === 'add' || operation.op === 'replace' || operation.op === 'test') && operation.value === undefined) {
        throw new exports.JsonPatchError('Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)', 'OPERATION_VALUE_REQUIRED', index, operation, document);
    }
    else if ((operation.op === 'add' || operation.op === 'replace' || operation.op === 'test') && helpers_1.hasUndefined(operation.value)) {
        throw new exports.JsonPatchError('Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)', 'OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED', index, operation, document);
    }
    else if (document) {
        if (operation.op == "add") {
            var pathLen = operation.path.split("/").length;
            var existingPathLen = existingPathFragment.split("/").length;
            if (pathLen !== existingPathLen + 1 && pathLen !== existingPathLen) {
                throw new exports.JsonPatchError('Cannot perform an `add` operation at the desired path', 'OPERATION_PATH_CANNOT_ADD', index, operation, document);
            }
        }
        else if (operation.op === 'replace' || operation.op === 'remove' || operation.op === '_get') {
            if (operation.path !== existingPathFragment) {
                throw new exports.JsonPatchError('Cannot perform the operation at a path that does not exist', 'OPERATION_PATH_UNRESOLVABLE', index, operation, document);
            }
        }
        else if (operation.op === 'move' || operation.op === 'copy') {
            var existingValue = { op: "_get", path: operation.from, value: undefined };
            var error = validate([existingValue], document);
            if (error && error.name === 'OPERATION_PATH_UNRESOLVABLE') {
                throw new exports.JsonPatchError('Cannot perform the operation from a path that does not exist', 'OPERATION_FROM_UNRESOLVABLE', index, operation, document);
            }
        }
    }
}
exports.validator = validator;
/**
 * Validates a sequence of operations. If `document` parameter is provided, the sequence is additionally validated against the object document.
 * If error is encountered, returns a JsonPatchError object
 * @param sequence
 * @param document
 * @returns {JsonPatchError|undefined}
 */
function validate(sequence, document, externalValidator) {
    try {
        if (!Array.isArray(sequence)) {
            throw new exports.JsonPatchError('Patch sequence must be an array', 'SEQUENCE_NOT_AN_ARRAY');
        }
        if (document) {
            //clone document and sequence so that we can safely try applying operations
            applyPatch(helpers_1._deepClone(document), helpers_1._deepClone(sequence), externalValidator || true);
        }
        else {
            externalValidator = externalValidator || validator;
            for (var i = 0; i < sequence.length; i++) {
                externalValidator(sequence[i], i, document, undefined);
            }
        }
    }
    catch (e) {
        if (e instanceof exports.JsonPatchError) {
            return e;
        }
        else {
            throw e;
        }
    }
}
exports.validate = validate;

},{"./helpers":11,"deep-equal":6}],10:[function(require,module,exports){
var equalsOptions = { strict: true };
var _equals = require('deep-equal');
var areEquals = function (a, b) {
    return _equals(a, b, equalsOptions);
};
var helpers_1 = require('./helpers');
var core_1 = require('./core');
/* export all core functions */
var core_2 = require('./core');
exports.applyOperation = core_2.applyOperation;
exports.applyPatch = core_2.applyPatch;
exports.applyReducer = core_2.applyReducer;
exports.getValueByPointer = core_2.getValueByPointer;
exports.validate = core_2.validate;
exports.validator = core_2.validator;
/* export some helpers */
var helpers_2 = require('./helpers');
exports.JsonPatchError = helpers_2.PatchError;
exports.deepClone = helpers_2._deepClone;
exports.escapePathComponent = helpers_2.escapePathComponent;
exports.unescapePathComponent = helpers_2.unescapePathComponent;
var beforeDict = [];
var Mirror = (function () {
    function Mirror(obj) {
        this.observers = [];
        this.obj = obj;
    }
    return Mirror;
}());
var ObserverInfo = (function () {
    function ObserverInfo(callback, observer) {
        this.callback = callback;
        this.observer = observer;
    }
    return ObserverInfo;
}());
function getMirror(obj) {
    for (var i = 0, length = beforeDict.length; i < length; i++) {
        if (beforeDict[i].obj === obj) {
            return beforeDict[i];
        }
    }
}
function getObserverFromMirror(mirror, callback) {
    for (var j = 0, length = mirror.observers.length; j < length; j++) {
        if (mirror.observers[j].callback === callback) {
            return mirror.observers[j].observer;
        }
    }
}
function removeObserverFromMirror(mirror, observer) {
    for (var j = 0, length = mirror.observers.length; j < length; j++) {
        if (mirror.observers[j].observer === observer) {
            mirror.observers.splice(j, 1);
            return;
        }
    }
}
/**
 * Detach an observer from an object
 */
function unobserve(root, observer) {
    observer.unobserve();
}
exports.unobserve = unobserve;
/**
 * Observes changes made to an object, which can then be retrieved using generate
 */
function observe(obj, callback) {
    var patches = [];
    var root = obj;
    var observer;
    var mirror = getMirror(obj);
    if (!mirror) {
        mirror = new Mirror(obj);
        beforeDict.push(mirror);
    }
    else {
        observer = getObserverFromMirror(mirror, callback);
    }
    if (observer) {
        return observer;
    }
    observer = {};
    mirror.value = helpers_1._deepClone(obj);
    if (callback) {
        observer.callback = callback;
        observer.next = null;
        var dirtyCheck = function () {
            generate(observer);
        };
        var fastCheck = function () {
            clearTimeout(observer.next);
            observer.next = setTimeout(dirtyCheck);
        };
        if (typeof window !== 'undefined') {
            if (window.addEventListener) {
                window.addEventListener('mouseup', fastCheck);
                window.addEventListener('keyup', fastCheck);
                window.addEventListener('mousedown', fastCheck);
                window.addEventListener('keydown', fastCheck);
                window.addEventListener('change', fastCheck);
            }
            else {
                document.documentElement.attachEvent('onmouseup', fastCheck);
                document.documentElement.attachEvent('onkeyup', fastCheck);
                document.documentElement.attachEvent('onmousedown', fastCheck);
                document.documentElement.attachEvent('onkeydown', fastCheck);
                document.documentElement.attachEvent('onchange', fastCheck);
            }
        }
    }
    observer.patches = patches;
    observer.object = obj;
    observer.unobserve = function () {
        generate(observer);
        clearTimeout(observer.next);
        removeObserverFromMirror(mirror, observer);
        if (typeof window !== 'undefined') {
            if (window.removeEventListener) {
                window.removeEventListener('mouseup', fastCheck);
                window.removeEventListener('keyup', fastCheck);
                window.removeEventListener('mousedown', fastCheck);
                window.removeEventListener('keydown', fastCheck);
            }
            else {
                document.documentElement.detachEvent('onmouseup', fastCheck);
                document.documentElement.detachEvent('onkeyup', fastCheck);
                document.documentElement.detachEvent('onmousedown', fastCheck);
                document.documentElement.detachEvent('onkeydown', fastCheck);
            }
        }
    };
    mirror.observers.push(new ObserverInfo(callback, observer));
    return observer;
}
exports.observe = observe;
/**
 * Generate an array of patches from an observer
 */
function generate(observer) {
    var mirror;
    for (var i = 0, length = beforeDict.length; i < length; i++) {
        if (beforeDict[i].obj === observer.object) {
            mirror = beforeDict[i];
            break;
        }
    }
    _generate(mirror.value, observer.object, observer.patches, "");
    if (observer.patches.length) {
        core_1.applyPatch(mirror.value, observer.patches);
    }
    var temp = observer.patches;
    if (temp.length > 0) {
        observer.patches = [];
        if (observer.callback) {
            observer.callback(temp);
        }
    }
    return temp;
}
exports.generate = generate;
// Dirty check if obj is different from mirror, generate patches and update mirror
function _generate(mirror, obj, patches, path) {
    if (obj === mirror) {
        return;
    }
    if (typeof obj.toJSON === "function") {
        obj = obj.toJSON();
    }
    var newKeys = helpers_1._objectKeys(obj);
    var oldKeys = helpers_1._objectKeys(mirror);
    var changed = false;
    var deleted = false;
    //if ever "move" operation is implemented here, make sure this test runs OK: "should not generate the same patch twice (move)"
    for (var t = oldKeys.length - 1; t >= 0; t--) {
        var key = oldKeys[t];
        var oldVal = mirror[key];
        if (helpers_1.hasOwnProperty(obj, key) && !(obj[key] === undefined && oldVal !== undefined && Array.isArray(obj) === false)) {
            var newVal = obj[key];
            if (typeof oldVal == "object" && oldVal != null && typeof newVal == "object" && newVal != null) {
                _generate(oldVal, newVal, patches, path + "/" + helpers_1.escapePathComponent(key));
            }
            else {
                if (oldVal !== newVal) {
                    changed = true;
                    patches.push({ op: "replace", path: path + "/" + helpers_1.escapePathComponent(key), value: helpers_1._deepClone(newVal) });
                }
            }
        }
        else {
            patches.push({ op: "remove", path: path + "/" + helpers_1.escapePathComponent(key) });
            deleted = true; // property has been deleted
        }
    }
    if (!deleted && newKeys.length == oldKeys.length) {
        return;
    }
    for (var t = 0; t < newKeys.length; t++) {
        var key = newKeys[t];
        if (!helpers_1.hasOwnProperty(mirror, key) && obj[key] !== undefined) {
            patches.push({ op: "add", path: path + "/" + helpers_1.escapePathComponent(key), value: helpers_1._deepClone(obj[key]) });
        }
    }
}
/**
 * Create an array of patches from the differences in two objects
 */
function compare(tree1, tree2) {
    var patches = [];
    _generate(tree1, tree2, patches, '');
    return patches;
}
exports.compare = compare;

},{"./core":9,"./helpers":11,"deep-equal":6}],11:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*!
 * https://github.com/Starcounter-Jack/JSON-Patch
 * (c) 2017 Joachim Wester
 * MIT license
 */
var _hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwnProperty(obj, key) {
    return _hasOwnProperty.call(obj, key);
}
exports.hasOwnProperty = hasOwnProperty;
function _objectKeys(obj) {
    if (Array.isArray(obj)) {
        var keys = new Array(obj.length);
        for (var k = 0; k < keys.length; k++) {
            keys[k] = "" + k;
        }
        return keys;
    }
    if (Object.keys) {
        return Object.keys(obj);
    }
    var keys = [];
    for (var i in obj) {
        if (hasOwnProperty(obj, i)) {
            keys.push(i);
        }
    }
    return keys;
}
exports._objectKeys = _objectKeys;
;
/**
* Deeply clone the object.
* https://jsperf.com/deep-copy-vs-json-stringify-json-parse/25 (recursiveDeepCopy)
* @param  {any} obj value to clone
* @return {any} cloned obj
*/
function _deepClone(obj) {
    switch (typeof obj) {
        case "object":
            return JSON.parse(JSON.stringify(obj)); //Faster than ES5 clone - http://jsperf.com/deep-cloning-of-objects/5
        case "undefined":
            return null; //this is how JSON.stringify behaves for array items
        default:
            return obj; //no need to clone primitives
    }
}
exports._deepClone = _deepClone;
//3x faster than cached /^\d+$/.test(str)
function isInteger(str) {
    var i = 0;
    var len = str.length;
    var charCode;
    while (i < len) {
        charCode = str.charCodeAt(i);
        if (charCode >= 48 && charCode <= 57) {
            i++;
            continue;
        }
        return false;
    }
    return true;
}
exports.isInteger = isInteger;
/**
* Escapes a json pointer path
* @param path The raw pointer
* @return the Escaped path
*/
function escapePathComponent(path) {
    if (path.indexOf('/') === -1 && path.indexOf('~') === -1)
        return path;
    return path.replace(/~/g, '~0').replace(/\//g, '~1');
}
exports.escapePathComponent = escapePathComponent;
/**
 * Unescapes a json pointer path
 * @param path The escaped pointer
 * @return The unescaped path
 */
function unescapePathComponent(path) {
    return path.replace(/~1/g, '/').replace(/~0/g, '~');
}
exports.unescapePathComponent = unescapePathComponent;
function _getPathRecursive(root, obj) {
    var found;
    for (var key in root) {
        if (hasOwnProperty(root, key)) {
            if (root[key] === obj) {
                return escapePathComponent(key) + '/';
            }
            else if (typeof root[key] === 'object') {
                found = _getPathRecursive(root[key], obj);
                if (found != '') {
                    return escapePathComponent(key) + '/' + found;
                }
            }
        }
    }
    return '';
}
exports._getPathRecursive = _getPathRecursive;
function getPath(root, obj) {
    if (root === obj) {
        return '/';
    }
    var path = _getPathRecursive(root, obj);
    if (path === '') {
        throw new Error("Object not found in root");
    }
    return '/' + path;
}
exports.getPath = getPath;
/**
* Recursively checks whether an object has any undefined values inside.
*/
function hasUndefined(obj) {
    if (obj === undefined) {
        return true;
    }
    if (obj) {
        if (Array.isArray(obj)) {
            for (var i = 0, len = obj.length; i < len; i++) {
                if (hasUndefined(obj[i])) {
                    return true;
                }
            }
        }
        else if (typeof obj === "object") {
            var objKeys = _objectKeys(obj);
            var objKeysLength = objKeys.length;
            for (var i = 0; i < objKeysLength; i++) {
                if (hasUndefined(obj[objKeys[i]])) {
                    return true;
                }
            }
        }
    }
    return false;
}
exports.hasUndefined = hasUndefined;
var PatchError = (function (_super) {
    __extends(PatchError, _super);
    function PatchError(message, name, index, operation, tree) {
        _super.call(this, message);
        this.message = message;
        this.name = name;
        this.index = index;
        this.operation = operation;
        this.tree = tree;
    }
    return PatchError;
}(Error));
exports.PatchError = PatchError;

},{}]},{},[4])(4)
});