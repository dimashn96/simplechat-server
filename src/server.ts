import * as http from 'http';
import * as WebSocket from 'ws';
import { config } from './config';

const port = config.websocket.port || 8081;
const clients = {}; 
const webSocketServer = new WebSocket.Server({port});

webSocketServer.on('connection', (ws) => {

  var id = Math.random();
  clients[id] = ws;
  console.log("new connection " + id);

  ws.on('message', (message) => {
    console.log('new message ' + message);

    for(var key in clients) {
      clients[key].send(message);
    }
  });

  ws.on('close', () => {
    console.log('connection closed ' + id);
    delete clients[id];
  });

});

console.log(`Server running on ${port}`);
