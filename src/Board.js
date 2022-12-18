import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { makeRandomChanceFunc } from "./helpers";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 8, ncols = 10, chanceLightStartsOn = 0.5 }) {
  const { randomChance: randomLit, getResults } = makeRandomChanceFunc(
    chanceLightStartsOn,
    {
      debug: true,
    }
  );

  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = Array.from(Array(nrows), () =>
      Array.from(Array(ncols), () => randomLit())
    );

    // debug helpers
    console.log("Board: ", initialBoard);
    console.log("Lit results: ", getResults());

    return initialBoard;
  }

  function hasWon() {
    return !board.some((row) => row.some((cell) => cell));
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (x, y, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = [...oldBoard];

      const coords = [
        [x, y],
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ];

      coords.forEach((coord) => flipCell(coord[0], coord[1], boardCopy));

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <h1>YOU WON!</h1>;
  }

  // make table board
  return (
    <table className="Board">
      <tbody>
        {board.map((row, iRow) => (
          <tr key={iRow}>
            {row.map((cell, iCol) => {
              const id = `${iRow}-${iCol}`;
              return (
                <Cell
                  flipCellsAroundMe={flipCellsAround}
                  isLit={cell}
                  id={id}
                  key={id}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;
