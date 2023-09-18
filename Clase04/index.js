const http = require('http')

const server = http.createServer()

server.listen(8080, () => {
    console.log('zarlanga puerto 8080');
})