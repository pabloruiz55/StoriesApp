var express = require('express');
var router = express.Router();
var status = require('http-status');
var mongoose = require('mongoose');
var catNames = require('cat-names');

module.exports.userGetRandom = function(req,res){
  let num= Math.floor(Math.random() * (5 - 1 + 1) + 1);
  user = {
    name: catNames.random(),
    _id: "12121212",
    imageUrl: `Monkey${num}.jpg`
  }
  res
    .status(200)
    .json(user);
};
