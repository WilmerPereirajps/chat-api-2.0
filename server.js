var puerto = 3000;
var moduloexpress = require('express');
var app = moduloexpress();
var servidor = require('http').createServer(app);
var io = require('socket.io').listen(servidor);

servidor.listen(puerto);
console.log('Servidor de websockets escuchando en puerto: ' + puerto);

app.get('/', function(req, res) {
    res.end('Servidor de websockets para DWEC IES San Clemente.');
});

io.sockets.on('connection', function(socket)
{
    console.log('++++ Nuevo cliente conectado ++++');
    socket.on('message', function(datosrecibidos)
    {
        io.sockets.emit('message', datosrecibidos);
    });

    socket.on('disconnect', function()
    {
        console.log('>>>> Se ha desconectado un cliente.');
    });

    socket.on('teletienda', function(datosrecibidos) {

        io.sockets.emit('teletienda', datosrecibidos);
        
    });

    socket.on('avisos', function(datosrecibidos)
    {
        io.sockets.emit('avisos', datosrecibidos);
    });

});
