// //    WE PERFORMS HERE EVENT LOOP ------=
// const sumRequestHandler=(req , res)=>{
//  console.log("in sum of request handler",req.url);
//  const body =[];
//  let result;
//  req.on('data' , chunk => body.push(chunk));
//  req.on('end' , () => {
//     const bodyStr = Buffer.concat(body).toString();
//     const params = new URLSearchParams(bodyStr);
//     const bodyObj = Object.fromEntries(params);
//    result = Number(bodyObj.first) + Number(bodyObj.second);
//     console.log(result);
//  });

//     res.setHeader("Content-Type" , "text/html");
//     res.write("<html>");
//     res.write("<head><title>Calculator</title></head>");
//     res.write("<body>");
//     res.write(`<h1>Your sum is ${result}</h1>`);
//     res.write("</body>");
//     res.write("</html>");
//     return res.end();

// }
// exports.sumRequestHandler = sumRequestHandler;
// is code mai ye the ki (data or end) jab tak print nii hoge tab tak reqyest execute nii kruga chahe kitna bhi wait krna pde









//UPPPER CODE KO VERIFY KR RHE H HUM YAHA PR----
//    WE PERFORMS HERE EVENT LOOP AND ASYNC CODE------=
const sumRequestHandler=(req , res)=>{
 console.log("1-in sum of request handler",req.url);// sabse pehle yaha chlega loop ---
 const body =[];
 let result;
 req.on('data' , chunk => {
   body.push(chunk)
   console.log("2- setting data");//data entry ki values print rkega 
});

 req.on('end' , () => {
   console.log("3-ended data");   // last mai end value print krega value tab tak 4 ki print ho chuki hoi to undefine aaiga  -------
    const bodyStr = Buffer.concat(body).toString();
    const params = new URLSearchParams(bodyStr);
    const bodyObj = Object.fromEntries(params);
   result = Number(bodyObj.first) + Number(bodyObj.second);
    console.log(result);
 });
   console.log("4-sending the data response"); // dusra yaha chlega data or end ko baad mai prnt krega or uski value nii aaigi to value undefine print krrega 
    res.setHeader("Content-Type" , "text/html");
    res.write("<html>");
    res.write("<head><title>Calculator</title></head>");
    res.write("<body>");
    res.write(`<h1>Your sum is ${result}</h1>`);
    res.write("</body>");
    res.write("</html>");
    return res.end();

}
exports.sumRequestHandler = sumRequestHandler;