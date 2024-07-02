const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
  files: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("NotesDB", NoteSchema);
