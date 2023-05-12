import React from "react";

const tableHeadings = [
  "Name",
  "Position",
  "Office",
  "Age",
  "Start date",
  "Salary",
];

const tableDataStyles = { border: "2px solid #d9d7d7", padding: "7px" };


// Inline css has been used throughout the Application, later can integrate to external file or 
// use CSS frameworks(TailwindCSS,ChakraUI etc..)

const Table = ({ data , handleSort}) => {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        border: "2px solid #d9d7d7",
      }}
    >
      <thead>
        <tr>
          {tableHeadings.map((tName, index) => (
            <th key={index} style={tableDataStyles}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems:'center'
                }}
              >
                {tName}
                <button onClick={()=>handleSort(tName)}>↓↑</button>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((person, index) => (
          <tr
            key={index}
            style={{ backgroundColor: index % 2 === 0 ? "white" : "grey" }}
          >
            <td style={tableDataStyles}>{person.name}</td>
            <td style={tableDataStyles}>{person.position}</td>
            <td style={tableDataStyles}>{person.office}</td>
            <td style={tableDataStyles}>{person.age}</td>
            <td style={tableDataStyles}>{person.startDate?.split("T")[0]}</td>
            <td style={tableDataStyles}>${person.salary}</td>
          </tr>
        ))}
      </tbody>
      <thead>
        <tr>
          {tableHeadings.map((tName, index) => (
            <th key={index} style={tableDataStyles}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems:'center'
                }}
              >
                {tName}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    </table>
  );
};

export default Table;
