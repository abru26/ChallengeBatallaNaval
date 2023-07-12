import React from "react";
import Matriz from "../components/Matriz";

const Home = (props) => {
  
  return (
    <div className="Home">
      <Matriz size={8} maxTiles={4} />
    </div>
  );
};

export default Home;
