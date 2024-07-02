import { useState } from "react";
import { apiConnector } from "../../../services/apiConnector";
import { addNotesEndPoints } from "../../../services/apis";
import { toast } from "react-hot-toast";
import FileBase64 from "react-file-base64";
import { useSelector } from "react-redux";

const AddNote = ({ handleAddNote }) => {
  const { token } = useSelector((state) => state.auth)
  const [noteText, setNoteText] = useState("");
  const [files, setFiles] = useState([]);
  const charLimit = 1000;

  const handleChange = (e) => {
    if (charLimit - e.target.value.length >= 0) {
      setNoteText(e.target.value);
    }
  };

  const handleFiles = (file) => {
    setFiles([...files, file]);
  };

  const saveClick = async () => {
    if (noteText.trim().length > 0) {
      try {
        const response = await apiConnector("POST", addNotesEndPoints.ADD_ONE_NOTE, { 
          note: noteText,
          files: files,
        }, {
          Authorization: `Bearer ${token}`,
        });
        if (response.data.success) {
          handleAddNote(response.data.data);
          toast.success("New Note Added");
          setNoteText("");
          setFiles([]);
        } else {
          console.error("Failed to add note:", response.data.message);
        }
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  return (
    <div className="note new rounded-md shadow-md bg-white p-4 mb-4">
      <textarea
        className="w-full h-40 resize-none border rounded-md py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        cols="10"
        rows="8"
        placeholder="Type to add a note..."
        value={noteText}
        onChange={handleChange}
      ></textarea>
      <FileBase64
        multiple={true}
        onDone={handleFiles}
      />
      <div className="flex items-center justify-between">
        <small>{charLimit - noteText.length} Remaining</small>
        <button className="bg-blue-500 py-2 text-white rounded-lg px-4 hover:scale-95 font-light hover:font-bold" onClick={saveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
