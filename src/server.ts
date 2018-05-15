import * as http from 'http';
import * as WebSocket from 'ws';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import {config} from './config';
import {DataBaseService} from './services/DataBaseService';

// Server

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://simplechat-client-web.cleverapps.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-auth');
    next();
});

// API file
const api = require(config.server.path.api);

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// API location
app.use('/api', api);

// Send all other requests this
app.get('*', (req, res) => {
    res.send({status: 'OK'});
});

// Set port
const port = process.env.PORT || config.server.port;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port: ${port}`));

// WebSocket Server

const wsPort = config.websocket.port || 8081;
const clients = {}; 
const webSocketServer = new WebSocket.Server({port: wsPort});

webSocketServer.on('connection', (ws) => {

  var id = Math.random();
  clients[id] = ws;
  console.log('new connection ' + id);

  ws.on('message', (message) => {
    console.log('new message ' + message);

    DataBaseService.addMessage(JSON.parse(message));

    for(var key in clients) {
      clients[key].send(message);
    }
  });

  ws.on('close', () => {
    console.log('connection closed ' + id);
    delete clients[id];
  });

});

console.log(`WebSocket server running on port: ${wsPort}`);

// Mongoose

DataBaseService.connect();