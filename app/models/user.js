"use strict";
const bcrypt = require('bcrypt');
const bookshelf = require('../db/bookshelf');

const Comment = require('./comment');
const Post = require('./post');

const User = bookshelf.Model.extend({
  tableName: 'users',
  initialize: function() {
    this.on('creating', this.encryptPassword);
  },
  hasTimestamps: true,
  posts: function() {
    return this.hasMany(Posts, 'author');
  },
  comments: function() {
    return this.hasMany(Comments);
  },
  encryptPassword:(model, attrs, options) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(model.attributes.password, 10, (err, hash) => {
        if (err) return reject(err);
         model.set('password', hash);
        resolve(hash);
      });
    });
  },
  validatePassword: function(suppliedPassword) {
    let self = this;
    return new 
});

module.exports = bookshelf.model('User', User);
