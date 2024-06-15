import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import NotesList from "./NotesList";
import Search from "./Search";
import Header from "./Header";

const CreateNotes = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first note!",
      date: "15/12/2023",
    },
    {
      id: nanoid(),
      text: "This is my second note!",
      date: "20/12/2023",
    },
    {
      id: nanoid(),
      text: "This is my third note!",
      date: "25/12/2023",
    },
    {
      id: nanoid(),
      text: "This is my fourth note!",
      date: "30/12/2023",
    },
  ]);

  const [searchText, setSearchText] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const AddNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    localStorage.setItem("react-notes-app-data", JSON.stringify(newNotes));
  };

  const DeleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    localStorage.setItem("react-notes-app-data", JSON.stringify(newNotes));
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={AddNote}
          handleDeleteNote={DeleteNote}
        />
      </div>
    </div>
  );
};

export default CreateNotes;
