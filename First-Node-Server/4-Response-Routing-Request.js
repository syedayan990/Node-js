// simple node.js server
const http = require('http');
const server = http.createServer((req , res)=>{
    if(req.url === '/'){
    res.setHeader('Content-type','text/html');
    res.write('<html>');
    res.write('<head><title>complete coding </title></head>');
    res.write('<body><h1>welcome to home</h1></body>');
    res.write('</html>');
    return res.end();
    }
    else if(res.url === '/products'){
    res.setHeader('Content-type','text/html');
    res.write('<html>');
    res.write('<head><title>complete coding </title></head>');
    res.write('<body><h1>check my product</h1></body>');
    res.write('</html>');
    return res.end();
    }
    else{
    res.setHeader('Content-type','text/html');
    res.write('<html>');
    res.write('<head><title>complete coding </title></head>');
    res.write('<body><h1>my name is ayan</h1></body>');
    res.write('</html>');
    return res.end();
    }
});
const PORT = 3000;
server.listen(PORT, () =>{
    console.log(`server running on address http://localhost: ${PORT}`)
});