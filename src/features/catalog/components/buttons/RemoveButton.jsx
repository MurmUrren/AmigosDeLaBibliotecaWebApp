import React from "react";
import "./RemoveButton.css";

const RemoveButton = ({ onClick, label = "X", style = {} }) => {
  return (
    <button className="remove-button" onClick={onClick} style={style}>
      {label}
    </button>
  );
};

export default RemoveButton;