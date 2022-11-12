const table = require('./Table');

class TableService {
  constructor() {
    this._table = table;
  }

  async getTable() {
    return this._table.cells;
  }

  async updateCell(row, column, cell) {
    this._table.cells[row][column] = cell;
  };
}

module.exports = TableService;
