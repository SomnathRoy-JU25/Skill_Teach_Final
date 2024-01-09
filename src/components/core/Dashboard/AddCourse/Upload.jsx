import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Upload = ({ name, label, register, errors, setValue }) => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("image"); // "image" or "video"
  const { editCourse, course } = useSelector((state) => state.course);

  const handelonchange = (e) => {
    const selectedFile = e.target.files[0];
    setValue(name, selectedFile);

    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop();
      if (fileExtension.match(/(jpg|jpeg|png|gif)/i)) {
        setFileType("image");
      } else if (fileExtension.match(/(mp4|mov|avi)/i)) {
        setFileType("video");
      } else {
        console.log("Unsupported file type");
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      console.log("No file selected");
    }
  };

  useEffect(() => {
    if (editCourse) {
      setFile(course?.thumbnail);
    }
  }, []);

  return (
    <div>
      {file ? (
        <div className="flex flex-col space-y-2">
          {fileType === "image" ? (
            <img
              src={file}
              alt=""
              className="h-full w-full rounded-md object-cover"
            />
          ) : (
            <video controls className="h-full w-full rounded-md object-cover">
              <source src={file} type={`video/${fileType}`} />
              Your browser does not support the video tag.
            </video>
          )}
          <button
            type="button"
            onClick={() => {
              setFile(null);
              setValue(name, null);
            }}
            className="text-sm text-richblack-5"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor={label}>
            <div>
              Course Thumbnail/Video <sup className="text-pink-200">*</sup>
            </div>

            <div className="bg-richblack-700 flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500">
              <div
                className="flex w-full flex-col items-center p-6"
                role="presentation"
                tabIndex={0}
              >
                <input
                  id={label}
                  name={name}
                  type="file"
                  accept="image/*, video/*, .jpeg, .jpg, .png, .mp4, .mov, .avi"
                  tabIndex="-1"
                  multiple=""
                  {...register(name, { required: true })}
                  onChange={handelonchange}
                  className="hidden"
                />
                {fileType === "image" ? (
                  <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-2xl text-yellow-50"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="16 16 12 12 8 16"></polyline>
                      <line x1="12" y1="12" x2="12" y2="21"></line>
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                      <polyline points="16 16 12 12 8 16"></polyline>
                    </svg>
                  </div>
                ) : (
                  <div className="w-14 h-14 bg-pure-greys-800 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="text-2xl text-yellow-50 mx-auto my-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 20a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 8v.01M4 12v.01M4 16v.01M8 4h.01M12 4h.01M16 4h.01M20 8v.01M20 12v.01M20 16v.01"
                      />
                    </svg>
                  </div>
                )}
                <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                  Drag and drop an image or video, or click to{" "}
                  <span className="font-semibold text-yellow-50">Browse</span>{" "}
                  a file
                </p>
                <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
                  <li>Aspect ratio 16:9</li>
                  <li>Recommended image size 1024x576</li>
                  <li>Supported video formats: mp4, mov, avi</li>
                </ul>
              </div>
            </div>
          </label>
          {errors.courseImage && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Image/Video is required**
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Upload;


// import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";

// const Upload = ({ name, label, register, errors, setValue }) => {
//   const [image, setimage] = useState(null);
//   const { editCourse, course } = useSelector((state) => state.course);

//   const handelonchange = (e) => {
//     const file = e.target.files[0];
//     setValue(name, e.target.files[0]);
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setimage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       console.log("no file");
//     }
//   };

//   useEffect(() => {
//     if (editCourse) {
//       setimage(course?.thumbnail);
//     }
//   }, []);

//   return (
//     <div>
//       {image ? (
//         <div className="flex flex-col space-y-2">
//           <img
//             src={image}
//             alt=""
//             className="h-full w-full rounded-md object-cover"
//           />
//           <button
//             type="button"
//             onClick={() => {
//               setimage(null);
//               setValue(name, null);
//             }}
//             className="text-sm text-richblack-5"
//           >
//             Remove
//           </button>
//         </div>
//       ) : (
//         <div className="flex flex-col space-y-2">
//           <label className="text-sm text-richblack-5" htmlFor={label}>
//             <div>
//               Course Thumbnail <sup className="text-pink-200">*</sup>
//             </div>

//             <div className="bg-richblack-700 flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500">
//               <div
//                 className="flex w-full flex-col items-center p-6"
//                 role="presentation"
//                 tabIndex={0}
//               >
//                 <input
//                   id={label}
//                   name={name}
//                   type="file"
//                   accept="image/*,.jpeg,.jpg,.png"
//                   tabIndex="-1"
//                   multiple=""
//                   {...register(name, { required: true })}
//                   onChange={handelonchange}
//                   className="hidden"
//                 />
//                 <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
//                   <svg
//                     stroke="currentColor"
//                     fill="none"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="text-2xl text-yellow-50"
//                     height="1em"
//                     width="1em"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <polyline points="16 16 12 12 8 16"></polyline>
//                     <line x1="12" y1="12" x2="12" y2="21"></line>
//                     <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
//                     <polyline points="16 16 12 12 8 16"></polyline>
//                   </svg>
//                 </div>
//                 <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
//                   Drag and drop an image, or click to{" "}
//                   <span className="font-semibold text-yellow-50">Browse</span> a
//                   file
//                 </p>
//                 <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
//                   <li>Aspect ratio 16:9</li>
//                   <li>Recommended size 1024x576</li>
//                 </ul>
//               </div>
//             </div>
//           </label>
//           {errors.courseImage && (
//             <span className="ml-2 text-xs tracking-wide text-pink-200">
//               Course Image is required**
//             </span>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Upload;