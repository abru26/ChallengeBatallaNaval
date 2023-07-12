import React, { useState } from 'react';
import Tile, { TileProps } from './Tile';

// TODO: Move to other file
enum Direction {
  Right = 'right',
  Left = 'left',
  Up = 'up',
  Down = 'down'
};

const Matriz = ({ size, maxTiles }) => {
  const initialTiles: TileProps[] = Array(size*size).fill(0).map((_, i) => ({
    checked: false
  }));

  const [tiles, setTiles] = useState<TileProps[]>(initialTiles);
  const [tilesChecked, setTilesChecked] = useState<number>(0);
  const [prevSelectedTiles, setPrevSelectedTiles] = useState<number[]>([]);
  const [direction, setDirection] = useState<Direction | null>(null);

  const isSameRow = (index: number) => {
    const prevSelectedTile = prevSelectedTiles[prevSelectedTiles.length-1];
    const prevRow = prevSelectedTile && Math.floor(prevSelectedTile / size);
    const newRow = Math.floor(index / size);
    return prevRow === newRow;
  };

  const isSameColumn = (index: number) => {
    const prevSelectedTile = prevSelectedTiles[prevSelectedTiles.length-1];
    const prevColumn = prevSelectedTile && prevSelectedTile % size;
    const newColumn = index % size;
    return prevColumn === newColumn;
  };

  const checkTile = (index: number, currentDirection?: Direction) => {
    const updatedTiles = [...tiles];
    updatedTiles[index].checked = true;
    setTilesChecked((prev: number) => prev + 1);
    setPrevSelectedTiles([...prevSelectedTiles ,index]);
    currentDirection && setDirection(currentDirection);
    setTiles(updatedTiles);
  };

  const calculateDirection = (index: number): Direction | undefined => {
    let currentDirection: Direction;
    const prevSelectedTile = prevSelectedTiles[prevSelectedTiles.length-1];

    // Right or left
    if(isSameRow(index)) {
      currentDirection = index > prevSelectedTile! ? Direction.Right : Direction.Left;
      return currentDirection;
    }

    // Up or down
    if(isSameColumn(index)) {
      currentDirection = index > prevSelectedTile! ? Direction.Down : Direction.Up; 
      return currentDirection;
    }
  };

  const isAdyacent = (index: number, currentDirection?: Direction): boolean => {
    const prevSelectedTile = prevSelectedTiles[prevSelectedTiles.length-1];
    if(!prevSelectedTile) {
      return false;
    }

    switch (currentDirection) {
      case Direction.Right:
        return index - prevSelectedTile === 1;
      case Direction.Left:
        return prevSelectedTile - index === 1;
      case Direction.Up:
        return prevSelectedTile - index === size;
      case Direction.Down:
        return index - prevSelectedTile === size;
      default:
        return index - prevSelectedTile === 1
          || prevSelectedTile - index === 1
          || prevSelectedTile - index === size
          || index - prevSelectedTile === size;
    }
  }

  const validTile = (index: number, currentDirection?: Direction): boolean => {
    if(direction) {
      return currentDirection === direction && isAdyacent(index, currentDirection);
    }
    return isAdyacent(index);
  };

  const handleClick = (index: number) => {
    const selectedTile = tiles[index];

    if(selectedTile.checked || tilesChecked >= maxTiles) {
      return;
    }

    if(!prevSelectedTiles.length) {
      return checkTile(index);
    }

    let currentDirection: Direction | undefined;
    const prevSelectedTile = prevSelectedTiles[prevSelectedTiles.length-1];
    if(prevSelectedTile) {
      currentDirection = calculateDirection(index);
    }

    if(validTile(index, currentDirection)) {
      if(!direction && currentDirection) {
        setDirection(currentDirection)
      }

      checkTile(index, currentDirection);
    }
  };

  const deleteLastTile = () => {
    if(prevSelectedTiles.length) {
      const prevSelectedTile = prevSelectedTiles[prevSelectedTiles.length-1];
      const updatedTiles: TileProps[] = [...tiles];
      updatedTiles[prevSelectedTile].checked = false;
      setTilesChecked((prev: number) => prev - 1);
      setPrevSelectedTiles((prevTiles) => prevTiles.slice(0, -1));
      if(prevSelectedTiles.length === 2) setDirection(null);
      setTiles(updatedTiles);
    }
  };

  const rotateTiles = () => {
    const [_, second, third, fourth] = prevSelectedTiles;

    // TODO: Fix rotate, only working for horizontal right
    const secondRotated = second + size - 1;
    const thirdRotated = third + (size * 2) - 2;
    const fourthRotated = fourth + (size * 3) - 3;

    const lastTile = tiles.length;
    if(secondRotated > lastTile || thirdRotated > lastTile || fourthRotated > lastTile) {
      return alert('Rotation out of scope');
    }

    const updatedTiles: TileProps[] = [...tiles];
    updatedTiles[second].checked = false;
    updatedTiles[third].checked = false;
    updatedTiles[fourth].checked = false;

    updatedTiles[secondRotated].checked = true;
    updatedTiles[thirdRotated].checked = true;
    updatedTiles[fourthRotated].checked = true;
    setTiles(updatedTiles);
  };

  return (
    <div>
      <button disabled={prevSelectedTiles.length !== maxTiles} onClick={rotateTiles}>Rotate Tiles</button>
      <button disabled={prevSelectedTiles.length <= 0} onClick={deleteLastTile}>Delete last tile</button>
      <div className="Matriz">
        {tiles.map((tile, i) => (<Tile {...tile} onClick={() => handleClick(i)} key={i}/>))}
      </div>
    </div>
  )
};

export default Matriz; 

