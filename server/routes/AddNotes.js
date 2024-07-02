const express = require("express")
const router = express.Router()
const {
  addOneNoteController,
  showAllNotesController,
  deleteNoteController,
} = require("../controllers/NotesController")
const { auth, isInstructor } = require("../middleware/auth");

router.post("/add-note", auth, isInstructor, addOneNoteController)
router.get("/all-notes", showAllNotesController)
router.delete("/delete-note/:id", deleteNoteController)

module.exports = router
