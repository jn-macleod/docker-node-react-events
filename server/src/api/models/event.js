const mongoose = require('mongoose');

const eventDateSchema = mongoose.Schema({
  start: { type: Date, require: true },
  end: { type: Date, require: true },
});

const eventSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, maxLength: 32 },
  description: { type: String, required: true },
  dates: {
    start: { type: Date, require: true },
    end: { type: Date, require: true },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Event', eventSchema);
