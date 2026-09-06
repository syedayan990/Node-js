//yaha humne server craete kiya h bus lkein ab server ko listen krana h to ---

// const http = require('http');

// function requestListner(req , res)// yaha function do value pass krega
// {
//    console.log(req);
// }
// http.createServer(requestListner);//function ka reference hum yaha pass kr rhe h 

//===============================================ORRR============================================

//yaha humne server craete kiya h bus lkein ab server ko listen krana h to ---
// const http = require('http');

// http.createServer(function (req , res)// yaha function do value pass krega
// {
//    console.log(req);
// });


//===============================================ORRR============================================

//yaha humne server craete kiya h bus lkein ab server ko listen krana h to ---
// const http = require('http');

// http.createServer((req , res)=>
// {
//    console.log(req);
// });



//===============================================ORRR============================================
//yaha humne server craete kiya h or server ko listenr bhi bnaya h 
// const http = require('http');

// const server = http.createServer((req , res)=>//yaha humne server k liye object return kiya taki wo hume listen krke value return kr sake
// {
//    console.log(req);
// });
// server.listen(3000);//(3000) is a port 





//===============================================ORRR============================================
//yaha humne server craete kiya h or server ko listenr bhi bnaya h or ab active bbi krege
// const http = require('http');

// const server = http.createServer((req , res)=>//yaha humne server k liye object return kiya taki wo hume listen krke value return kr sake
// {
//    console.log(req);
   
// });
// const PORT = 3000;
// server.listen(PORT, () =>{
//     console.log(`server running on address http://localhost: ${PORT}`)
// });//(3000) is a port 






// FOR EXIT EVENT LOOP================
const http = require('http');

const server = http.createServer((req , res)=>//yaha humne server k liye object return kiya taki wo hume listen krke value return kr sake
{
   console.log(req);
   process.exit();
   
});
const PORT = 3000;
server.listen(PORT, () =>{
    console.log(`server running on address http://localhost: ${PORT}`)
});//(3000) is a port 