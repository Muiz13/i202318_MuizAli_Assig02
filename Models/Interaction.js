const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  type: { type: String, enum: ['like', 'comment', 'follow'], required: true },
}, { timestamps: true });

const Interaction = mongoose.model('Interaction', interactionSchema);

module.exports = Interaction;
