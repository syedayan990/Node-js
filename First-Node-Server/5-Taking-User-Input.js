//simple node.js server
const http = require('http');
const fs = require('fs');

const server = http.createServer((req , res)=>{
    
        if(req.url === '/'){
        res.setHeader('Content-type','text/html');
        res.write('<html>');
        res.write('<head><title>complete coding </title></head>');
        res.write('<body><h1>Enter Your Deatils</h1>');
        res.write('<form action="/submit-details" method="POST">');
        res.write('<input type="text" name="username" placeholder="Enter Your Name"><br>');
        res.write('<label for="male">Male</label>');
        res.write('<input type="radio" id="male" name="gender" value="male" />');
        res.write('<label for="female">Female</label>');
        res.write('<input type="radio" id="female" name="gender" value="female" />');
        res.write('<label for="other">Other</label>');
        res.write('<input type="radio" id="other" name="gender" value="other" />');
        res.write('<br><input type="submit" value="Submit"/>');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
         }
        else if(req.url.toLowerCase() ===" /submit-details" && req.method == "POST"){
         fs.writeFileSync('user.text','Syed Ayan');
         res.statusCode = 302; //302 ka mtlb h aapko location change krni h -----
         res.setHeader('Location','/');
         return res.end();

        // res.setHeader('Content-type','text/html');
        // res.write('<html>');
        // res.write('<head><title>complete coding </title></head>');
        // res.write('<body><h1>check my product</h1></body>');
        // res.write('</html>');
        // return res.end();
        }
      
        res.setHeader('Content-type','text/html');
        res.write('<html>');
        res.write('<head><title>complete coding </title></head>');
        res.write('<body><h1>my name is ayan</h1></body>');
        res.write('</html>');
        return res.end();
        
    });
    const PORT = 3000;
    server.listen(PORT, () =>{
        console.log(`server running on address http://localhost: ${PORT}`)
    });  

