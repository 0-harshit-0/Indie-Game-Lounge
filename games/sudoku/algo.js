

function verifyInputGrid(matrix, size) {
	const max = size*size;
	let valid = true;

	for (var i = matrix.length - 1; i >= 0; i--) {
		const cols = matrix[i];
		console.log(cols, "c")

		if (cols.find(z => z > max)) {
			valid = false;
			break;
		}
	}

	return valid;
}



class Sudoku {
	constructor(size = 2) {
		this.size = size;
		this.grid = null;
	}

	#inputGrid() {
		return Array.from({ length: this.size }, () => new Array(this.size).fill(0));
	}

	createGrid() {
		this.grid = Array.from({ length: this.size }, () => 
			Array.from({ length: this.size }, () => this.#inputGrid(this.size))
		);

		return this.grid;
	}

	input(gridRow, gridCol, inputRow, inputCol, value) {
		this.grid[gridRow][gridCol][inputRow][inputCol] = value;
		
		return value;
	}

	verifyInput(gridRow, gridCol, inputRow, inputCol) {
		const max = this.size*this.size;
		let valid = true;

		if (this.grid[gridRow][gridCol][inputRow][inputCol] > max) {
			valid = false;
		}

		let rowData = [];
		this.grid[gridRow].forEach(z => {
			rowData = [...rowData, ...z[inputRow]];
		});
		const filteredRow = rowData.filter(val => val !== 0);
		if (filteredRow.length !== new Set(filteredRow).size) {
			console.log(rowData, "rowData failed validation");
			valid = false;
		}

		let colData = [];
		this.grid.forEach(z => {
			z[gridCol].forEach(y => {
				colData.push(y[inputCol])
			})
		});
		const filteredCol = colData.filter(val => val !== 0);
		if (filteredCol.length !== new Set(filteredCol).size) {
			console.log(colData, "colData failed validation");
			valid = false;
		}


		return valid;
	}
}

const sudoku = new Sudoku();
const sudokuGrid = sudoku.createGrid();

sudoku.input(0, 0, 0, 0, 1);
sudoku.input(0, 1, 0, 0, 2);
sudoku.input(1, 1, 0, 0, 1);

console.log(sudokuGrid);


sudoku.input(0, 1, 0, 1, 3);
console.log(sudoku.verifyInput(0, 1, 0, 1));
