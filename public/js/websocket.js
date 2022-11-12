const ws = new WebSocket(`ws://${location.host}/table`);

function emit(method, message) {
  const data = JSON.stringify({method, message});
  ws.send(data);
}
