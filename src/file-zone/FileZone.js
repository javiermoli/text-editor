import React from "react";
import "./FileZone.css";

const FileZone  = ({text, onClick}) => {
  return (
    <div id="file-zone">
      <div id="file">
        <div
          contentEditable
          onDoubleClick={onClick}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

export default FileZone;
