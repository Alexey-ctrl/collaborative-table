const tbody = document.querySelector('#table-body');
let tableInputs = [];
generateTable();

ws.addEventListener('message', async e => {
  const {event, message, error} = JSON.parse(e.data);
  if (error === 'NoAuthenticationInformation') {
    await logout();
  }
  if (event === 'updateCell') {
    updateCell(message.row, message.column, message.isEdit, message.value);
  }
});

ws.addEventListener('close', e => {
  window.blur();
})

window.onbeforeunload = () => {
  document.activeElement.blur();
}

function onInput(event) {
  sendTableInputEvent(event.target, 'input');
}

function onFocus(event) {
  sendTableInputEvent(event.target, 'focus');
}

function onFocusout(event) {
  sendTableInputEvent(event.target, 'focusout', false);
}

function sendTableInputEvent(input, eventName, isEdit = true) {
  const inputData = getInputData(input);
  inputData.isEdit = isEdit;
  emit('updateCell', {...inputData, event: eventName});
}

function generateTable() {
  tbody.innerHTML = '';
  tableInputs = [];
  getTable().then(table => {
    table.forEach((row, index) => {
      addRow(row, index);
    });
  });
}

function addRow(row, rowIndex) {
  tableInputs.push([]);
  const tr = document.createElement('tr');
  row.forEach((cell, columnIndex) => {
    const td = document.createElement('td');
    const input = createTableInput(cell, rowIndex, columnIndex);
    td.append(input);
    tr.append(td);
  });
  tbody.append(tr);
}

function createTableInput(cell, rowIndex, columnIndex) {
  const input = document.createElement('input');
  input.setAttribute('row', rowIndex);
  input.setAttribute('column', columnIndex);

  input.addEventListener('focus', onFocus);
  input.addEventListener('input', onInput);
  input.addEventListener('focusout', onFocusout);
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') event.target.blur();
  });

  tableInputs[rowIndex].push(input);
  updateCell(rowIndex, columnIndex, cell.isEdit, cell.value);
  return input;
}

function updateCell(row, column, isEdit, value) {
  const input = tableInputs[row][column];

  input.value = value;
  if (isEdit) {
    input.className = 'edition';
    input.disabled = true;
  } else {
    input.className = '';
    input.disabled = !isAuth;
  }
}

function getInputData(input) {
  const row = input.getAttribute('row');
  const column = input.getAttribute('column');
  const isEdit = input.classList.contains('edition');
  const value = input.value;
  return {row, column, value, isEdit};
}

function disableTable() {
  tableInputs.forEach(row => {
    row.forEach(input => input.disabled = true);
  });
}
