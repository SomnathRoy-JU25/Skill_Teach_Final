import React from "react";

const Header = ({ handleToggleDarkMode }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <h1 className="text-2xl font-bold text-white">Notes</h1>
      <button
        onClick={() =>
          handleToggleDarkMode((previousDarkMode) => !previousDarkMode)
        }
        className="save"
      >
        Toggle Mode
      </button>
    </div>
  );
};

export default Header;
