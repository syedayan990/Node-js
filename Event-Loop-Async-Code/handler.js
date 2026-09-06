const sumRequestHandler = require('./Sum');

const requestHandler=(req , res)=>{
 console.log(req.url , req.method);
 if(req.url === "/"){
    res.setHeader("Content-Type" , "text/html");
    res.write("<html>");
    res.write("<head><title>Home</title></head>");
    res.write("<body>");
    res.write("<h1>Welcome To Calculator</h1>");
    res.write('<a href="/calculator">Go To Calculator</a>');
    res.write("</body>");
    res.write("</html>");
    return res.end(); 

 }
  else if(req.url.toLowerCase() === "/calculator"){
     res.setHeader("Content-Type" , "text/html");
    res.write("<html>");
    res.write("<head><title>Home</title></head>");
    res.write("<body>");
    res.write("<h1>Here is the Calculator</h1>");
    res.write('<form action="/calculate-result" method="POST">');
    res.write('<input type="text" name="first" placeholder="First Num"/>');
    res.write('<input type="text" name="second"  placeholder="Second Num"/>');
    res.write('<input type="Submit"  value="sum"/>');
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end(); 
  }   
  else if(req.url.toLowerCase() === "/calculate-result" && req.method === 'POST'){
    return sumRequestHandler.sumRequestHandler(req , res);
   
  }

    // else{
    // res.setHeader("Content-Type" , "text/html");
    // res.write("<html>");
    // res.write("<head><title>Calculator</title></head>");
    // res.write("<body>");
    // res.write("<h1>404 page does not exist</h1>");
    // res.write('<a href="/">Go to home</a>');
    // res.write("</body>");
    // res.write("</html>");
    // return res.end();
    // }  
}
exports.requestHandler= requestHandler;