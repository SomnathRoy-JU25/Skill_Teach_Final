import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options= { {
        strings: [
          "Devops",
          "Full Stack Development",
          "Artificial Intelligence",
          "Machine Learning",
          "& What Not."
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      } }
    />
  );
}

export default Type;