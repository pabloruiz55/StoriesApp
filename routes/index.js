var express = require("express");
var router = express.Router();

var ctrlStories = require("../controllers/stories.controller");
var ctrlStoryPieces = require("../controllers/storyPieces.controller");
var ctrlTestCrypto = require("../controllers/test.controller");
var ctrlUser = require("../controllers/user.controller");

router
    .route("/stories")
      .get(ctrlStories.storiesGetAll)
      .post(ctrlStories.storiesAddOne)

router
    .route("/stories/:storyId")
      .get(ctrlStories.storiesGetOne)

//Story Pieces routers

router
    .route("/stories/:storyId/storyPieces")
      //.get(ctrlStoryPieces.reviewsGetAll)
      .post(ctrlStoryPieces.storyPieceAddRoot);

router
    .route("/stories/:storyId/storyPieces/:storyPieceId")
      .post(ctrlStoryPieces.storyPieceAddChild)
      .get(ctrlStoryPieces.storyPieceGetOne)


//test
router
  .route("/test")
    .get(ctrlTestCrypto.testTestCrypto)

router
  .route("/user")
  .get(ctrlUser.userGetRandom)

module.exports = router;
