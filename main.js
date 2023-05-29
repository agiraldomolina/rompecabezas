let matrix = shuffleMatrix();

/*
let matrix = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "", "8"],
];
*/

let board = document.querySelector(".board");

drawTokens();
addEventListeners();

function nextMovement(actualPosition, emptyPosition) {
  if (
    actualPosition[0] - emptyPosition[0] === -1 &&
    actualPosition[1] === emptyPosition[1]
  ) {
    return "down";
  } else if (
    actualPosition[0] - emptyPosition[0] === 1 &&
    actualPosition[1] === emptyPosition[1]
  ) {
    return "up";
  } else if (
    actualPosition[1] - emptyPosition[1] === -1 &&
    actualPosition[0] === emptyPosition[0]
  ) {
    return "right";
  } else if (
    actualPosition[1] - emptyPosition[1] === 1 &&
    actualPosition[0] === emptyPosition[0]
  ) {
    return "left";
  } else {
    return "noMove";
  }
}

function drawTokens() {
  board.innerHTML = "";
  matrix.forEach((row) =>
    row.forEach((element) => {
      if (element == "") {
        board.innerHTML += `<div class="empty">${element}</div>`;
      } else {
        board.innerHTML += `<div class="token">${element}</div>`;
      }
    })
  );
}

function addEventListeners() {
  let tokens = document.querySelectorAll(".token");
  tokens.forEach((token) =>
    token.addEventListener("click", () => {
      let actualPosition = searchPosition(token.innerText);
      let emptyPosition = searchPosition("");
      let movement = nextMovement(actualPosition, emptyPosition);

      if (movement !== "noMove") {
        updateMatrix(token.innerText, actualPosition, emptyPosition);

        let result = compareMatrix();
        if (result === true) {
          confetti({
            spread: 360,
            particleCount: 300,
          });
        }

        drawTokens();
        addEventListeners();
      }
    })
  );
}

function searchPosition(element) {
  let rowIndex = 0;
  let colIndex = 0;
  matrix.forEach((row, iRow) => {
    let iCol = row.findIndex((item) => item == element);
    // findIndex value its the index for the column where element is found
    // iRow value its the index value for teh row where element is found
    if (iCol !== -1) {
      rowIndex = iRow;
      colIndex = iCol;
    }
  });
  return [rowIndex, colIndex];
}

function updateMatrix(element, actualPosition, emptyPosition) {
  console.log(matrix[0][0]);
  let rowActualPosition = actualPosition[0];
  let colActualPosition = actualPosition[1];
  let rowEmptyPosition = emptyPosition[0];
  let rcolEmptyPosition = emptyPosition[1];
  matrix[actualPosition[0]][actualPosition[1]] = "";
  matrix[emptyPosition[0]][emptyPosition[1]] = element;
  console.log(matrix);
}

function shuffleMatrix() {
  let shuffleMatrix = [[], [], []];

  let array = ["1", "2", "3", "4", "5", "6", "7", "8", ""];
  let shufflearray = array.sort(() => Math.random() - 0.5);

  let column = 0;
  let row = 0;

  shufflearray.forEach((element) => {
    shuffleMatrix[row].push(element);
    if (column < 2) {
      column++;
    } else {
      column = 0;
      row++;
    }
  });
  return shuffleMatrix;
}

function compareMatrix() {
  let counter = 0;
  let finalMatrix = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", ""],
  ];
  matrix.forEach((row, iRow) => {
    row.forEach((element, iColumn) => {
      if (element == finalMatrix[iRow][iColumn]) {
        counter++;
      }
    });
  });
  if (counter == 9) {
    return true;
  } else {
    return false;
  }
}

//minuto 1:46:30 del tutorial
