import React from "react";
import Main from "./Main";
import MainEvent from "./MainEvent";
import "./css/Main.css";

const Home = () => {
  return (
    <div className="mcontainer">
      <Main />
      <MainEvent />
    </div>
  );
};
export default Home;