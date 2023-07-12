import React from "react";

export type TileProps = {
  checked: boolean;
  onClick?: () => void;
};

const Tile = ({ checked, onClick }: TileProps) => {
  return (
    <div className={`Tile ${checked ? "checked" : ""}`} onClick={onClick}></div>
  );
};

export default Tile; 
