var mongoose = require('mongoose');

var StoryPieceSchema = new mongoose.Schema({
  storyPieceText: String,
  childrenStoryPieces:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StoryPiece'
        }],
  parentStoryPiece: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StoryPiece'
        },
  level: Number,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StoryPiece', StoryPieceSchema);
