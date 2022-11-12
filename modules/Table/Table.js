const config = require('../../config');

class Table {
  constructor({columns, rows}) {
    this.cells = [];
    for (let row = 0; row < rows; row++) {
      this.cells.push(new Array(columns).fill({value: '', isEdit: false}));
    }
  }
}

module.exports = new Table(config.table);
