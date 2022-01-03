const express = require("express");
const app = express();

app.listen(3003, function(){console.log("app is listening  to port 3003")})

//==== step 2  ====
app.get("/", (req, res)=>{res.sendStatus(200);})


//==== step 3 test route ====
app.get("/test", (req, res)=>{res.json({status: 200, Message:"ok"})})

//---- step 3 time route ----
function getTime(){
    const today = new Date();
    return (`${today.getHours()}:${today.getMinutes()}`)
}

app.get("/time", (req, res)=>{res.json({status:200, Message: getTime()})})


//==== step 4 Hello route ====
app.get("/hello", (req, res)=>{res.json({status:200, message:"Hello!"})})
app.get("/hello/:ID", (req, res)=>{res.json({status:200, message:`Hello, ${req.params.ID}!`})})

//---- step 4 search api ----
app.get("/Search", (req, res)=>{
    const searchQuery = req.query.s;
    
    if (searchQuery === "" || searchQuery === undefined){res.status(500).json({status: 500, error:true, message: "you have to provide a search query"})

    } else {res.status(200).json({status: 200, message: "ok", data: searchQuery})}
})