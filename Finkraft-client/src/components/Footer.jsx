import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";


// Inline css has been used throughout the Application, later can integrate to external file or 
// use CSS frameworks(TailwindCSS,ChakraUI etc..)

const Footer = ({ totalUsers, startUser, endUsers, onPageChange }) => {
  const buttonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
  };

  const [pages, setPages] = useState([]);

  const breakPoints = [{ width: 1200, itemsToShow: 6, itemsToScroll: 1 }];

  const renderArrow = ({ type, onClick }) => (
    <div onClick={onClick}>
      {type === "PREV" ? (
        <button style={buttonStyle}>Previous</button>
      ) : (
        <button style={buttonStyle} disabled={totalUsers / 6 < 6}>
          Next
        </button>
      )}
    </div>
  );

  const generatePages = () => {
    let pageArr = [];
    for (let i = 1; i <= Math.floor(totalUsers / 6)-1; i++) {
      pageArr.push(i);
    }
    setPages(pageArr);
  };

  useEffect(() => {
    generatePages();
  }, [totalUsers]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      <div>
        <span>{`Showing ${
          startUser + 1
        } to ${endUsers} of ${totalUsers} entries`}</span>
      </div>
      <div style={{ width: "400px" }}>
        <Carousel
          breakPoints={breakPoints}
          pagination={false}
          showArrows={true}
          renderArrow={renderArrow}
        >
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Footer;
