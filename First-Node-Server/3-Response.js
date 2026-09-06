// simple node.js server'
const http = require('http');
const server = http.createServer((req , res)=>{
    // res.setHeader('content-type' , 'JSON');
    res.setHeader('Content-type','text/html');
    res.write('<html>');
    res.write('<head><title>complete coding </title></head>');
    res.write('<body><h1>ayan/sheenam/mumma</h1></body>');
    res.write('</html>');
    res.end();

});
const PORT = 3000;
server.listen(PORT, () =>{
    console.log(`server running on address http://localhost: ${PORT}`)
});