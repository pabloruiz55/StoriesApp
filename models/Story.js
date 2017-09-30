var mongoose = require('mongoose');

var StorySchema = new mongoose.Schema({
  storyTitle: String,
  storyPieces: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StoryPiece'
        }],
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', StorySchema);
