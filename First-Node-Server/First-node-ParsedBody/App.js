const http = require('http');
const myRequestHandler = require('./ParsedBody');
const server = http.createServer(myRequestHandler);


  const PORT = 3000;
    server.listen(PORT, () =>{
        console.log(`server running on address http://localhost: ${PORT}`)
    });  
