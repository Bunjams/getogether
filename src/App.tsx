import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { motion } from "framer-motion";
import Shimmer from "components/Design/Shimmer/Shimmer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <motion.img
          src={logo}
          alt="logo"
          className="h-40 w-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1.5 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Shimmer.Button />
        <br />
        <Shimmer.Img />
      </header>
    </div>
  );
}

export default App;
