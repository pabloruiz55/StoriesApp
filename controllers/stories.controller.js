var express = require('express');
var router = express.Router();
var status = require('http-status');
var mongoose = require('mongoose');
var Story = require('../models/Story.js');

module.exports.storiesGetAll = function(req,res){

  Story
    .find()
    .populate({
      path: 'storyPieces',
      populate: { path: 'childrenStoryPieces' }
    })
    .exec(function(err,stories){
      if(err){
        res
          .status(500)
          .json(err);
      }else{
        console.log("found stories: ",stories.length);
        res
          .status(200)
          .json(stories);
      }
    });
};

module.exports.storiesGetOne = function(req,res){

  var storyId = req.params.storyId;

  Story
    .findById(storyId)
    .populate({
      path: 'storyPieces',
      populate: { path: 'childrenStoryPieces' }
    })
    .populate({
      path: 'storyPieces',
      populate: { path: 'parentStoryPiece' }
    })
    .exec(function(err,doc){
      var response = {
          status : 200,
          message : doc
      }
      if(err){
          response.status = 400;
          response.message = err;
      }else if(!doc){
          response.status = 400;
          response.message = {message : "Story ID not found"};
      }
      res
          .status(response.status)
          .json(response.message);
    });
};

module.exports.storiesAddOne = function(req,res){

   Story
    .create({
        storyTitle : req.body.storyTitle,
    },function(err,story){
        if(err){
            console.log("error creating story");
            res
                .status(400)
                .json(err);
        }else{
            console.log("story created");
            res
                .status(201)
                .json(story);
        }
    });
}

// /* GET ALL STORIES */
// router.get('/', function(req, res, next) {
//
//   Story.find(function (err, stories) {
//     if (err) return next(err);
//     res.json(stories);
//   });
//
// });
//
// /* SAVE Story */
// router.post('/', function(req, res, next) {
//   //console.log(req.body);
//   Story.create(req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });
//
// module.exports = router;
