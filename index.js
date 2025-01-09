const express = require('express')
const app = express()
const cors = require('cors')
const {WebSocketServer, WebSocket} = require("ws");
const PORT = process.env.PORT || 4000

let messages = "default"
app.use(cors())
app.use(express.json())


function onSocketPreError(Error) {
    console.log(Error)
}

function onSocketPostError(Error) {
    console.log(Error)
}



const s = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const wss = new WebSocketServer({ noServer: true });


s.on('upgrade', (req, socket, head) => {
    socket.on('error', onSocketPreError);

    // perform auth
    if (!!req.headers['BadAuth']) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
    }

    wss.handleUpgrade(req, socket, head, (ws) => {
        socket.removeListener('error', onSocketPreError);
        wss.emit('connection', ws, req);
    });
});


wss.on('connection', (ws, req) => {
    ws.on('error', onSocketPostError);

    ws.on('message', (msg) => {

        messages = msg

        console.log(messages)
    });

    ws.on('close', () => {
        console.log('Connection closed');
    });
});


app.get('/', (request, response) => {
    response.send('<div>' +
        '<h1>Hello World!</h1>' +
        `<p>${messages}</p>` +
        '</div>')
})




app.post('/ECG', (request, response) => {
    color = request.body
    console.log(color)
    response.json(color)
})

