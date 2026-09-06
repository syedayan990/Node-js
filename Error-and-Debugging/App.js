//create server
const http = require('http');

// const testingSyntex = require("./syntex");
// const Runtime = require("./Runtime");
const Logical = require("./Logical");

const server =  http.createServer((req , res)=>{
   console.log(req.url , req.method);
   // testingSyntex();
   // Runtime();
   Logical();
});


const PORT = 3000;
 server.listen( PORT , () =>{
    console.log(`server running on address http://localhost: ${PORT}`);
 })