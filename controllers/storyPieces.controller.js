var express = require('express');
var router = express.Router();
var status = require('http-status');
var mongoose = require('mongoose');
var StoryPiece = require('../models/StoryPiece.js');
var Story = require('../models/Story.js');

module.exports.storyPieceAddRoot = function(req,res){
    var storyId = req.params.storyId;

    //1- Find the Story
    Story.findById(storyId).exec()
    .then(function(result){
      var story = result;
      var newStoryPiece = {
        storyPieceText : req.body.storyPieceText,
        parentStoryPiece : null,
        level: 0
      }
      //2- create a new StoryPiece
      return StoryPiece
       .create(newStoryPiece)
        .then(function(storyPiece){
          return [story, storyPiece];
        });
    }).then(function(result){
      var story = result[0];
      var storyPiece = result[1];
      //3- store the StoryPiece ref inside the Story
      story.storyPieces.push(storyPiece);
      return story.save()
        .then(function(story2) {
          return [story, storyPiece];
        })
    }).then(function(result){
      var story = result[0];
      var storyPiece = result[1];
      console.log("a ver",story, storyPiece);
      res
          .status(201)
          .json(storyPiece);
    })
}

module.exports.storyPieceAddChild = function(req,res){
    var storyId = req.params.storyId;
    var storyPieceParentId = req.params.storyPieceId;

    //1- Find the Story
    Story.findById(storyId).exec()
    .then(function(story){
      return StoryPiece.findById(storyPieceParentId).exec()
      .then(function(storyPieceParent){
        return [story,storyPieceParent];
      })
    }).then(function(result){
      var story = result[0];
      var storyPieceParent = result[1];

      var newStoryPiece = {
        storyPieceText : req.body.storyPieceText,
        parentStoryPiece : storyPieceParent,
        level : storyPieceParent.level +1
      }
      //2- create a new StoryPiece
      return StoryPiece
       .create(newStoryPiece)
        .then(function(newStoryPiece){
          return [story, storyPieceParent,newStoryPiece];
        });
    }).then(function(result){
      var story = result[0];
      var storyPieceParent = result[1];
      var newStoryPiece = result[2];
      //3- store the StoryPiece ref inside the Story
      story.storyPieces.push(newStoryPiece);
      return story.save()
        .then(function(story2) {
          return [story, storyPieceParent,newStoryPiece];
        })
    }).then(function(result){
      var story = result[0];
      var storyPieceParent = result[1];
      var newStoryPiece = result[2];
      storyPieceParent.childrenStoryPieces.push(newStoryPiece);
      return storyPieceParent.save()
        .then(function(storyPieceParent2) {
          return [story, storyPieceParent,newStoryPiece]
        })
    }).then(function(result){
      var story = result[0];
      var storyPieceParent = result[1];
      var newStoryPiece = result[2];
      console.log("a ver",story, storyPieceParent,newStoryPiece);
      //4- If it's the first StoryPiece of the Story, return.
      res
          .status(201)
          .json(newStoryPiece);

    })
}

// module.exports.storyPieceGetOneByLevel = function(req,res){
//
//   var storyId = req.params.storyId;
//   var storyPieceLevel = req.params.storyPieceLevel;
//
//   StoryPiece.findById(storyPieceId)
//   .populate({
//     path: 'childrenStoryPieces',
//     // Get friends of friends - populate the 'friends' array for every friend
//     populate: { path: 'childrenStoryPieces' }
//   })
//   .exec()
//   .then(function(storyPiece){
//     console.log("StoryPiece",storyPiece);
//     res
//         .status(201)
//         .json(storyPiece);
//   }).catch(function(err){
//     console.log(err);
//     res
//         .status(400)
//         .json(err);
//   })
// };

module.exports.storyPieceGetOne = function(req,res){

  var storyId = req.params.storyId;
  var storyPieceId = req.params.storyPieceId;

  StoryPiece.findById(storyPieceId)
  .populate({
    path: 'childrenStoryPieces',
    // Get friends of friends - populate the 'friends' array for every friend
    populate: { path: 'childrenStoryPieces' }
  })
  .exec()
  .then(function(storyPiece){
    console.log("StoryPiece",storyPiece);
    res
        .status(201)
        .json(storyPiece);
  }).catch(function(err){
    console.log(err);
    res
        .status(400)
        .json(err);
  })
};
