import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"

import { apiConnector } from "../../../services/apiConnector"
import { addNotesEndPoints } from "../../../services/apis"
import Header from "./Header"
import NotesList from "./NotesList"
import Search from "./Search"

const { SHOW_ALL_NOTES, DELETE_NOTE } = addNotesEndPoints

const CreateNotes = () => {
  const { token } = useSelector((state) => state.auth)
  const [notes, setNotes] = useState([])
  const [searchText, setSearchText] = useState("")
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await apiConnector("GET", SHOW_ALL_NOTES)
        console.log("Fetch Notes Response:", response) // Add logging here
        if (response.data.success) {
          setNotes(response.data.data)
        } else {
          toast.error("Failed to fetch notes: " + response.data.message)
        }
      } catch (error) {
        toast.error("Error fetching notes: " + error.message)
        console.error("Error fetching notes:", error) // Add logging here
      }
    }

    fetchNotes()
  }, [])

  const addNote = (note) => {
    setNotes((prevNotes) => [...prevNotes, note])
  }

  const deleteNote = async (id) => {
    try {
      const response = await apiConnector("DELETE", `${DELETE_NOTE}/${id}`, {
        Authorization: `Bearer ${token}`,
      })
      toast.success("Note deleted successfully")
      if (response.data.success) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id))
        toast.success("Note deleted successfully")
      } else {
        console.log("Failed to delete note: " + response.data.message)
      }
    } catch (error) {
      console.log("Error deleting note: " + error.message)
    }
  }

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="ml-auto mr-auto min-h-lvh max-w-full p-5">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter(
            (note) =>
              note.note &&
              note.note.toLowerCase().includes(searchText.toLowerCase())
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  )
}

export default CreateNotes
