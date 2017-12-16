
'use strict'

const bcrypt = require('bcrypt-nodejs')

module.exports.id = 'admin-user-seed'

module.exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  this.db.collection('users').insert({
    email: 'admin@onehd.net',
    password: bcrypt.hashSync('adminpass1234')
  })
  done()
}

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done()
}