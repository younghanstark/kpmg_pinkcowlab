const WS_URL = location.origin;

const ws_client = io(WS_URL);

console.log(`Connected to ${WS_URL} : client`);
