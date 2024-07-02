const NotesDB = require("../models/Notes");

exports.showAllNotesController = async (req, res) => {
  try {
    const notes = await NotesDB.find(); // Find All Notes DB Query
    if (!notes.length) {
      return res.status(400).json({ success: false, message: "No notes found" });
    }
    return res.status(200).json({
      success: true,
      data: notes,
      message: "Notes fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addOneNoteController = async (req, res) => {
  try {
    const { note, files } = req.body;

    if (!note && (files.length === 0 || !files )) {
      return res.status(400).json({ success: false, message: "Note content or image is required" });
    }

    const newNote = new NotesDB({ note, files });
    await newNote.save();

    return res.status(201).json({
      success: true,
      data: newNote,
      message: "Note added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.deleteNoteController = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await NotesDB.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
