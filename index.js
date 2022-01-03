const express = require("express");
const app = express();

app.listen(3003, function(){console.log("app is listening  to port 3003")})


app.get("/", (req, res)=>{res.sendStatus(200);})