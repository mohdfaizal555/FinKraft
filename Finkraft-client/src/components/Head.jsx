import React from "react";

// Inline css has been used throughout the Application, later can integrate to external file or 
// use CSS frameworks(TailwindCSS,ChakraUI etc..)

const Head = ({ onChange, value, showEntries, entryChange, max }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      <div>
        <span>Show</span>
        <input
          type="number"
          value={showEntries}
          onChange={entryChange}
          min="0"
          max={max}
          style={{ padding: "5px 0px", width: "50px", margin: "0px 5px" }}
        />
        <span>entries</span>
      </div>
      <div>
        <span>Search:</span>
        <input
          type="text"
          style={{ padding: "5px 0px", margin: "0px 5px" }}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Head;
