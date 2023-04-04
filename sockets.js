const { WebSocketServer } = require('ws');
const uuid = require('uuid');
const DB = require('./database.js');

class Socker {
    constructor(httpServer) {
        const wss = new WebSocketServer({ noServer: true});
        let connections = [];

        httpServer.on('upgrade', (request, socket, head) => {
            wss.handleUpgrade(request, socket, head, function done(ws) {
                wss.emit('connection', ws, request);
            });
        });
        
        wss.on('connection', (ws) => {
            const connection = { id: uuid.v4(), alive: true, ws: ws };
            connections.push(connection);

            ws.on('message', function random(data) {
                console.log(String.fromCharCode(...data));
                const spell = DB.getRandomSpell();
                // console.log(spell);
                ws.send(JSON.stringify(spell));
            });

            // Respond to pong messages by marking the connection alive
            ws.on('pong', () => {
                connection.alive = true;
            });
        });


        // Keep active connections alive
        setInterval(() => {
        connections.forEach((c) => {
          // Kill any connection that didn't respond to the ping last time
          if (!c.alive) {
            c.ws.terminate();
          } else {
            c.alive = false;
            c.ws.ping();
          }
        });
      }, 10000);
    }
}

module.exports= {Socker};