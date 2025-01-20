class GameOfLife {
  constructor(width, height) {
    this.canvas = new Canvas(); // monta o canvas
    this.BoardSize = {
      Width: width,
      Height: height
    }
    this.CellSize = { // tamanho da celula
      Width: this.canvas.Width / width,
      Height: this.canvas.Height / height
    }
    this.Cells = [] // celulas
    this.startCells() // cria as celulas
    this.startNears() // vizinhos da celula
  }

  startCells() {
    for (let y = 0; y < this.BoardSize.Height; y++) { // for para as colunas
      const line = [];
      this.Cells.push(line)
      for (let x = 0; x < this.BoardSize.Width; x++) { // for para linhas 
        const cell = { // celula
          alive: getRandomInt(0, 2),
          x: x * this.CellSize.Width,
          y: y * this.CellSize.Height,
          next: 0
        }
        line.push(cell)
      }
    }
  }

  startNears() {
    // aqui ele pega os vizinhos da celula, tanto da linha quanto na coluna
    this.Cells.forEach((line, y) => {
      line.forEach((cell, x) => {
        cell.nears = [];
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx !== 0 || dy !== 0) {
              const vx = x + dx
              const vy = y + dy
              if (vx >= 0 && vx < this.BoardSize.Width && vy >= 0 && vy < this.BoardSize.Height) {
                const vcell = this.Cells[vy][vx]
                cell.nears.push(vcell); // celula vizinha
              }
            }
          }
        }
      })
    })
  }

  calculate() {
    for (const line of this.Cells) {
      for (const cell of line) {
        let v = 0
        for (const vcell of cell.nears) {
          v += vcell.alive
        }
        // calcula a proxima geração
        if (cell.alive) cell.next = +(v >= 2 && v <= 3) // o + na expressao converte o resultado em numero, ent se a expressao retornar false, vai mostrar 0.
        else cell.next = (v === 3)
      }
    }
  }

  update() {
    for (const line of this.Cells) {
      for (const cell of line) {
        cell.alive = cell.next
      }
    }
  }

  render() {
    for (const line of this.Cells) {
      for (const cell of line) {
        this.renderCell(cell);
      }
    }
  }
  renderCell(cell) {
    this.canvas.rectangle(cell.x, cell.y, this.CellSize.Width, this.CellSize.Height, 'black', 'gray')
    if (cell.alive) {
      this.canvas.rectangle(cell.x, cell.y, this.CellSize.Width, this.CellSize.Height, 'black', 'blue')
    }
  }

  execute() {
    this.calculate()
    this.update()
    this.render()
  }
}

const game = new GameOfLife(20, 20);

function executeGame() {
  game.execute();
  requestAnimationFrame(executeGame)
}

requestAnimationFrame(executeGame)