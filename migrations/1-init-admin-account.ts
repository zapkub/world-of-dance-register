
'use strict'

const bcrypt = require('bcrypt-nodejs')
require('dotenv')

module.exports.id = 'admin-user-seed'

module.exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  this.db.collection('users').insert({
    email: 'admin@onehd.net',
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'adminpass1234'),
    role: 'ADMIN'
  })
  done()
}

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done()
}