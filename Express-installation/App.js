//create server
// Create Server
// core module
// const http = require('http'); // isko hum hta sakte h  kuokii iska kaam ab expres kr dega 
// external module
const express = require('express');
// local module
const requestHandler = require('./8-ParsedBody');

const App =express();


//1- first middleware
// App.use((req , res , next)=>
//    App.use("/", //universal path
//       (req , res , next)=>//yaha hum path define kr rhe h 
//    {
//    console.log("Came in first middleware",req.url , req.method);
//    // res.send("<p>i am sheenam and i am leaning about full stack</p>");// ek baaar send kr diya to end h wo dusri request nii chlegi jab tak first chelgi agr dono same ho or first ko kooi value nii di gai ho tab chelga second werna firsst hi chlega always
//       next();// ye second middle ware ko req bhej dega agr next nii lgaya to requet yhi ruk jaigi or second middle ware tak nii jaigi request
// });



//  App.use("/", 
App.get("/", // jese (use) mai hum post krke chla rhe the tab ye console bhi print ho rhah tha but get mai ye bhi nii aaiga 
      (req , res , next)=>
   {
   console.log("Came in first middleware",req.url , req.method);
    next();
});

//2- second middleware
// App.use((req , res , next)=>
   // App.use("/submit-details",//ye middle ware bhi tab chlega jab universal slash middleware chlega 
App.post("/submit-details",// (post) skip lr dega isko or another middleware post krega
      (req , res , next)=>
   {
   console.log("Came in second middleware",req.url , req.method);
   res.send("<h1>i am ayan and currtly i am learning nodejs </h1>");

});

App.use("/" , (req , res , next) => {
   console.log("come in another middleware" , req.url , req.method);
   res.send("<p>come form another middleware</p>");
});

// const server = http.createServer(requestHandler);
// const server = http.createServer(App);// server ki zrurt niii ab express nai hi server ka kaam kr diya ===//App bhi yaha ek requesthandler h jo request le raha h 

// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// }); // yaha server ka kaam bhi express kr deta h 
const PORT = 3000;
App.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});