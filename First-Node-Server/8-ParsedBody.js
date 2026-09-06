//simple node.js server
const http = require('http');
const fs = require('fs');
const { buffer } = require('stream/consumers');

const server = http.createServer((req , res)=>{
    console.log(req.url , req.method);
    
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
        else if(req.url.toLowerCase() === "/submit-details" && req.method == "POST"){
        
            //here we use buffering cbunks and provide chunks ;
            const body = [];  //here we make a array
            req.on('data' , (chunk) =>   // on ka mtlb h ki mai requet kr raha hu listen ki jab bhi koi data ajaeor us chunk ko call back kr dege
                {
                console.log(chunk);
                body.push(chunk);  // yaha humarray ko value pass kra rhe h 
            });  
            req.on('end' , ()=>{
                const ParsedBody = Buffer.concat(body).toString();
                console.log(ParsedBody);
                const Params = new URLSearchParams(ParsedBody);
                //const BodyObject = {};//yaha hum key or val ko store kr rhe h 
                // for(const [key , val] of Params.entries())// yahA HUM KEY OR VAL MAI TOD RHE H
                //     {
                //         BodyObject[key] = val; // hum yaha bracket notation use kr rhe h because key hume as a veriable mili h hmare pass pehle se nii thi ye 
            

                // }
                //======================OR =====
                const BodyObject = Object.fromEntries(Params);
                  console.log(BodyObject);
                   fs.writeFileSync('user.text', JSON.stringify(BodyObject));
            });
            

        
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

