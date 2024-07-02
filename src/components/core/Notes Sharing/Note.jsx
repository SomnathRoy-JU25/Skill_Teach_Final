import { MdDeleteForever } from 'react-icons/md';

const Note = ({ id, text, date, files, handleDeleteNote }) => {
  return (
    <div className="note bg-white p-4 rounded-md shadow-md flex flex-col justify-between">
      <span className="text-gray-800">{text}</span>
      {files && files.length > 0 && (
        <div className="mt-4">
          {files.map((fileArray, index) => (
            Array.isArray(fileArray) && fileArray.map((file, idx) => (
              <div key={`${index}-${idx}`} className="image-container mb-2">
                <img src={file.base64} alt={file.name} className="w-full h-auto object-contain" />
              </div>
            ))
          ))}
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <small className="text-gray-500">{date}</small>
        <MdDeleteForever
          onClick={() => handleDeleteNote(id)}
          className="cursor-pointer text-red-500 hover:text-red-700"
          size="1.5em"
        />
      </div>
    </div>
  );
};

export default Note;
