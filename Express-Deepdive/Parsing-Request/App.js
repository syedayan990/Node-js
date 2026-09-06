const express = require('express');// external modules
const bodyparser = require('body-parser');// external modules

const App = express();

App.use((req , res , next)=>{
    console.log("first dummy middleware" , req.url , req.method);
    next();
});

App.use((req , res , next)=>{
    console.log("second dummy middleware" , req.url , req.method);
    next();
});

// App.use((req , res , next)=>{
//     console.log("Third middleware" , req.url , req.method);
//     res.send("<h1>Welcome to my Page</h1>");
// });  // ye comment isliye kra agr ye chjalta rhega to age kisi ko chlne nii dega;


App.get("/",(req , res , next)=>{
    console.log("handling / for GET" , req.url , req.method);
    res.send(`<p>hello bhaiyo i am ayan</p>`);
    // next();
});

App.get("/contect-us",(req , res , next) =>{
    console.log("Handling /contact-us GET" , req.url , req.method);
    res.send(`<p>please give your ddetail</p>
        <form action ="/contect-us" method="POST">
        <input type="text" name="name" placeholder="Enter your name" />
        <input type="email" name="email" placeholder="Enter your email" />
        <input type="submit"/>
        </form>
        `);
})


App.post("/contect-us" , (req , res, next)=>{
    console.log("handling /constact-us for POST" , req.url , req.method , req.body);
    // res.send(`<h1>Thanks for your details</h1>`);
    next(); 
});

App.use(express.urlencoded());

App.post("/contect-us" , (req , res, next)=>{
    console.log("handling /constact-us for POST" , req.url , req.method , req.body);
    res.send(`<h1>Thanks for your details</h1>`);
});

const PORT = 3000;
App.listen(PORT , () => {
    console.log(`server running on address http://localhost:${PORT}`); 
});





