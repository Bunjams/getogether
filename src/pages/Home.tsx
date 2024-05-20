import Shimmer from "components/Design/Shimmer/Shimmer";
import useDocumentTitle from "hooks/useDocumentTitle";
import React from "react";

const Home = () => {
  useDocumentTitle("Getogether");
  return (
    <div className="App">
      <header className="App-header">
        <Shimmer.Button />
        <br />
        <Shimmer.Avatar />
      </header>
    </div>
  );
};

export default Home;
