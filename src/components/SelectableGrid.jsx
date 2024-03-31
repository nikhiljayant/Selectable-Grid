import React, { useCallback, useState } from "react";

const SelectableGrid = ({ rows, cols }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedBoxes, setSelectedBoxes] = useState([]);

  // The first box selected
  const handleMouseDown = (boxNumber) => {
    setIsMouseDown(true);
    setSelectedBoxes([boxNumber]);
  };
  // The boxes selected in between
  const handleMouseEnter = useCallback(
    (boxNumber) => {
      if (isMouseDown) {
        const startBox = selectedBoxes[0];
        const endBox = boxNumber;

        const startRow = Math.floor((startBox - 1) / cols);
        const startCol = (startBox - 1) % cols;
        const endRow = Math.floor((endBox - 1) / cols);
        const endCol = (endBox - 1) % cols;

        const minRow = Math.min(startRow, endRow);
        const maxRow = Math.max(startRow, endRow);
        const minCol = Math.min(startCol, endCol);
        const maxCol = Math.max(startCol, endCol);

        const selected = [];
        for (let row = minRow; row <= maxRow; row++) {
          for (let col = minCol; col <= maxCol; col++) {
            selected.push(row * cols + col + 1);
          }
        }

        setSelectedBoxes(selected);
      }
    },
    [isMouseDown]
  );
  // The last Box selected
  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div
      style={{
        "--rows": rows,
        "--cols": cols,
        display: "grid",
        gridTemplateColumns: "repeat(var(--cols, 10), 35px)",
        gridTemplateRows: "repeat(var(--rows, 10), 35px)",
        gap: "2px",
        userSelect: 'none'
      }}
      onMouseUp={handleMouseUp}
    >
      {[...Array(rows * cols).keys()].map((_, i) => (
        <div
          key={i}
          style={{
            width: "35px",
            height: "35px",
            border: "1px solid black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: selectedBoxes.includes(i + 1) && 'lightblue'
          }}
          onMouseDown={() => handleMouseDown(i + 1)}
          onMouseEnter={() => handleMouseEnter(i + 1)}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};

export default SelectableGrid;
