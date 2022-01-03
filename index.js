const express = require("express");
const app = express();

app.listen(3003, function(){console.log("app is listening  to port 3003")})


app.get("/", (req, res)=>{res.sendStatus(200);})

app.get("/test", (req, res)=>{res.json({status: 200, Message:"ok"})})

function getTime(){
    const today = new Date();
    return (`${today.getHours()}:${today.getMinutes()}`)
}

app.get("/time", (req, res)=>{res.json({status:200, Message: getTime()})})



