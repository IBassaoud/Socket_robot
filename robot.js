//Petite application de chat
const express = require('express');
let app = express();
const fs = require('fs');
let http = require('http');
let server = http.createServer(app); //je créer une instance de serveur avec http.createServer
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static('public'));

const port = 9090;
let teleID =""
let robotID = ""

//Affiche mon fichier HTML 

// app.get("/tele", function(req, res){
//     res.sendFile(__dirname + '/tele.html');
// });

// app.get("/robot", function(req, res){
//     res.sendFile(__dirname + '/robot_demo.html');
// });

io.on("connection", (socket) => {
    socket.on('tele', (msg) => {
        console.log("tele connected : " + msg);
        teleID = msg ;
    });

    socket.on('robo', (msg) => {
        console.log("robo command : " + msg);
        robotID = msg
    });

    socket.on('command', (msg) => {
        console.log("command : " + msg);
        if (robotID === "") { socket.emit("norobo","")}
        io.to(robotID).emit("move",msg)
    });

    socket.on("disconnect", () => { //l'user ne se déconnecte que quand sa connexion a cessé
        console.log("User disconnected"); // quand la connexion est off .on 'disconnect' fonction callback console log deconnecté
    });
});
 
server.listen(port, () => {
    console.log('\n\nServer launched at http://localhost:' + port);
});

