import React from "react";

const About = () => {
  return (
    <div className="h-screen">
      {" "}
      <p>long content</p>
      {
        // indicates very long content
        Array.from({ length: 100 }, (_, index) => (
          <React.Fragment key={index}>
            {index % 20 === 0 && index ? "more" : "..."}
            <br />
          </React.Fragment>
        ))
      }
    </div>
  );
};

export default About;
