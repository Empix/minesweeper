let grid = [];
const gridWidth = 16;
const gridHeight = 16;

function init() {
  createGrid();
  createBombs();

  console.log(grid);
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

      if (grid[x - 1] != undefined) {
        if (grid[x - 1][y - 1] != undefined) {
          if (grid[x - 1][y - 1] != -1) {
            grid[x - 1][y - 1]++;
          }
        }
      }
      if (grid[x - 1] != undefined) {
        if (grid[x - 1][y] != undefined) {
          if (grid[x - 1][y] != -1) {
            grid[x - 1][y]++;
          }
        }
      }
      if (grid[x - 1] != undefined) {
        if (grid[x - 1][y + 1] != undefined) {
          if (grid[x - 1][y + 1] != -1) {
            grid[x - 1][y + 1]++;
          }
        }
      }

      if (grid[x + 1] != undefined) {
        if (grid[x + 1][y - 1] != undefined) {
          if (grid[x + 1][y - 1] != -1) {
            grid[x + 1][y - 1]++;
          }
        }
      }
      if (grid[x + 1] != undefined) {
        if (grid[x + 1][y] != undefined) {
          if (grid[x + 1][y] != -1) {
            grid[x + 1][y]++;
          }
        }
      }
      if (grid[x + 1] != undefined) {
        if (grid[x + 1][y + 1] != undefined) {
          if (grid[x + 1][y + 1] != -1) {
            grid[x + 1][y + 1]++;
          }
        }
      }

      if (grid[x] != undefined) {
        if (grid[x][y - 1] != undefined) {
          if (grid[x][y - 1] != -1) {
            grid[x][y - 1]++;
          }
        }
      }
      if (grid[x] != undefined) {
        if (grid[x][y + 1] != undefined) {
          if (grid[x][y + 1] != -1) {
            grid[x][y + 1]++;
          }
        }
      }
    }
  }
}

const table = document.querySelector(".grid tbody");
function createTable() {
  let result = "";
  for (let y = 0; y < gridHeight; y++) {
    result += "<tr>";
    for (let x = 0; x < gridWidth; x++) {
      if (grid[x][y] == -1) {
        result += `<td onclick="explode()" class="bomb">${grid[x][y]}</td>`;
      } else {
        result += `<td class="pos${x}-${y}" onclick="openCell(${x}, ${y})">${
          grid[x][y] || ""
        }</td>`;
      }
    }
    result += "</tr>";
  }
  table.innerHTML = result;
}

function explode() {
  document.documentElement.style.setProperty("--bomb-color", "var(--red)");
}

function openCell(x, y) {
  const cell = document.querySelector(`.pos${x}-${y}`);
  const isOpen = cell.dataset.open;

  if (isOpen) return;

  cell.dataset.open = true;
  cell.style.backgroundColor = "var(--background-secondary)";
  cell.style.color = "var(--white)";

  if (grid[x - 1] != undefined) {
    if (grid[x - 1][y - 1] != undefined) {
      if (grid[x - 1][y - 1] == 0) {
        openCell(x - 1, y - 1);
      } else {
        const numCell = document.querySelector(`.pos${x - 1}-${y - 1}`);
        numCell.style.backgroundColor = "var(--background-secondary)";
        numCell.style.color = "var(--white)";
      }
    }
  }
  if (grid[x - 1] != undefined) {
    if (grid[x - 1][y] != undefined) {
      if (grid[x - 1][y] == 0) {
        openCell(x - 1, y);
      } else {
        const numCell = document.querySelector(`.pos${x - 1}-${y}`);
        numCell.style.backgroundColor = "var(--background-secondary)";
        numCell.style.color = "var(--white)";
      }
    }
  }
  if (grid[x - 1] != undefined) {
    if (grid[x - 1][y + 1] != undefined) {
      if (grid[x - 1][y + 1] == 0) {
        openCell(x - 1, y + 1);
      } else {
        const numCell = document.querySelector(`.pos${x - 1}-${y + 1}`);
        numCell.style.backgroundColor = "var(--background-secondary)";
        numCell.style.color = "var(--white)";
      }
    }
  }

  if (grid[x + 1] != undefined) {
    if (grid[x + 1][y - 1] != undefined) {
      if (grid[x + 1][y - 1] == 0) {
        openCell(x + 1, y - 1);
      } else {
        const numCell = document.querySelector(`.pos${x + 1}-${y - 1}`);
        numCell.style.backgroundColor = "var(--background-secondary)";
        numCell.style.color = "var(--white)";
      }
    }
  }
  if (grid[x + 1] != undefined) {
    if (grid[x + 1][y] != undefined) {
      if (grid[x + 1][y] == 0) {
        openCell(x + 1, y);
      } else {
        const numCell = document.querySelector(`.pos${x + 1}-${y}`);
        numCell.style.backgroundColor = "var(--background-secondary)";
        numCell.style.color = "var(--white)";
      }
    }
  }
  if (grid[x + 1] != undefined) {
    if (grid[x + 1][y + 1] != undefined) {
      if (grid[x + 1][y + 1] == 0) {
        openCell(x + 1, y + 1);
      } else {
        const numCell = document.querySelector(`.pos${x + 1}-${y + 1}`);
        numCell.style.backgroundColor = "var(--background-secondary)";
        numCell.style.color = "var(--white)";
      }
    }
  }

  if (grid[x] != undefined) {
    if (grid[x][y - 1] != undefined) {
      if (grid[x][y - 1] == 0) {
        openCell(x, y - 1);
      } else {
        const numCell = document.querySelector(`.pos${x}-${y - 1}`);
        numCell.style.backgroundColor = "var(--background-secondary)";
        numCell.style.color = "var(--white)";
      }
    }
  }
  if (grid[x] != undefined) {
    if (grid[x][y + 1] != undefined) {
      if (grid[x][y + 1] == 0) {
        openCell(x, y + 1);
      } else {
        const numCell = document.querySelector(`.pos${x}-${y + 1}`);
        numCell.style.backgroundColor = "var(--background-secondary)";
        numCell.style.color = "var(--white)";
      }
    }
  }
}

init();
