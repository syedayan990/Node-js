const http = require('http');

const server = http.createServer((req, res)=>//yaha humne server k liye object return kiya taki wo hume listen krke value return kr sake
{
   console.log(req.url , req.method , req.headers);
  
   
});
const PORT = 3000;
server.listen(PORT, () =>{
    console.log(`server running on address http://localhost: ${PORT}`)
});