let grid = [];
const gridWidth = 16;
const gridHeight = 16;

function init() {
  createGrid();
  createBombs();
  createTable();
}

function createGrid() {
  for (let x = 0; x < gridWidth; x++) {
    grid.push([]);
    for (let y = 0; y < gridHeight; y++) {
      grid[x][y] = 0;
    }
  }
}

function createBombs() {
  const bombAmount = Math.round((gridWidth * gridHeight) / 10);
  const bombsPosition = [];
  for (let i = 0; i < bombAmount; i++) {
    const x = Math.floor(Math.random() * gridWidth);
    const y = Math.floor(Math.random() * gridHeight);

    if (bombsPosition.includes(`${x}-${y}`)) {
      console.log("repetiu!");
      i--;
    } else {
      bombsPosition.push(`${x}-${y}`);
      grid[x][y] = -1;

      generateHints({ x, y });
    }
  }
}

function generateHints(bombPosition) {
  for (let posX = -1; posX <= 1; posX++) {
    for (let posY = -1; posY <= 1; posY++) {
      if (posX == 0 && posY == 0) continue;

      const x = bombPosition.x + posX;
      const y = bombPosition.y + posY;

      const value = grid[x]?.[y];
      if (value != undefined && value != -1) {
        grid[x][y]++;
      }
    }
  }
}

const table = document.querySelector(".grid tbody");
function createTable() {
  let result = "";
  for (let x = 0; x < gridHeight; x++) {
    result += "<tr>";
    for (let y = 0; y < gridWidth; y++) {
      if (grid[x][y] == -1) {
        result += `<td onclick="explode()" class="bomb">${grid[x][y]}</td>`;
      } else {
        result += `<td class="pos${x}-${y}" onclick="openCell({ x: ${x}, y: ${y}})">${
          grid[x][y] || ""
        }</td>`;
      }
    }
    result += "</tr>";
  }
  table.innerHTML = result;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function explode() {
  document.documentElement.style.setProperty("--bomb-color", "var(--red)");
  await sleep(50);
  alert("Você perdeu!");
  init();
  document.documentElement.style.setProperty(
    "--bomb-color",
    "var(--background-secondary-dark)"
  );
}

function openCell(position) {
  const cell = document.querySelector(`.pos${position.x}-${position.y}`);
  const isOpen = cell.dataset.open;

  if (isOpen) return;

  cell.dataset.open = true;
  cell.style.backgroundColor = "var(--background-secondary)";
  cell.style.color = "var(--white)";

  for (let posX = -1; posX <= 1; posX++) {
    for (let posY = -1; posY <= 1; posY++) {
      if (posX == 0 && posY == 0) continue;

      const x = position.x + posX;
      const y = position.y + posY;

      const value = grid[x]?.[y];
      if (value != undefined) {
        if (value == 0) {
          openCell({ x, y });
        } else {
          const numCell = document.querySelector(`.pos${x}-${y}`);
          if (numCell) {
            numCell.style.backgroundColor = "var(--background-secondary)";
            numCell.style.color = "var(--white)";
          }
        }
      }
    }
  }
}

init();
