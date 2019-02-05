import React from "react";
import "./FileZone.css";

const FileZone = ({ text, onClick }) => {
  return (
    <div id="file-zone">
      <div id="file">
        <div
          contentEditable
          dangerouslySetInnerHTML={{ __html: text }}
          onDoubleClick={onClick}
        />
      </div>
    </div>
  );
};

export default FileZone;
