const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const bodyParser= require('body-parser');

//==== step 12 MongoDB ====


const url = "mongodb+srv://bakri:0000@cluster0.m9dax.mongodb.net/MoviesDB?retryWrites=true&w=majority"
const connectionParams = {useNewUrlParser: true, useUnifiedtopology: true}

mongoose.connect(url, connectionParams).then(()=>{console.log("connected to Database successfully")}).catch((err)=>{console.log(`something went wrong ${err}`)})

const Schema = mongoose.Schema;

const moviesDbSchema = new Schema({
    title:{type: String, required: true},
    year:{type: Number, required: true},
    rating:{type: Number, required: true, default: 4}
});

const movies = mongoose.model("movies", moviesDbSchema)

const DB = ()=> { return ( movies.find());}



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




app.get("/movies/create", (req, res)=>{});
app.get('/movies/read', async (req, res) => {res.send({data: await movies.find()})});
app.get("/movies/update", (req, res)=>{});
app.get("/movies/delete", (req, res)=>{});


//==== step 6 search ====

app.get("/movies/read/by-date", (req, res)=>{ 
    movies.find()
    .then(result => {res.json({status:200, data: result.sort((a,b)=>{return (b.year - a.year)})})})   
})

app.get("/movies/read/by-rating", (req, res)=> {
    movies.find()
    .then(result => { res.json({status:200, data: result.sort((a, b)=>{return (b.rating -a.rating)})})})
})

app.get("/movies/read/by-title", (req, res)=>{
    movies.find()
    .then(result => {res.json({status:200, data: result.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      })})})
})


//==== step 7 Read one ====

app.get("/movies/read/id/:ID",  (req, res)=>{

    let ID = req.params.ID
    movies.findById(ID)
    .then(result =>{res.status(200).json({status:200, Data: result})})
    .catch(err=>{res.status(404).json({status:404, error:true, message:"the movie <ID> does not exist"}) })

}
)


//==== step 8 CREATE ====

app.post("/movies/add", async(req, res)=>{

    const title = req.query.title;
    const year = parseInt(req.query.year);
    const rating = parseInt(req.query.rating) || 4;

    if(title === undefined || title ==="" || isNaN(year) || year.toString().length < 4)
        {res.status(403).json({status: 403, error: true, message: "you cannot creat a movie without providing a title and a year"})}
    else {
       movies.create({ title: title, year: year, rating: rating })
        .then(res.status(200).json({status:200, data: await DB()}))
        .catch(err=>{err})
        }
}
)

//==== step 9 DELETE ====

app.delete("/movies/delete/:ID", async (req, res)=>{

    const ID = req.params.ID

    movies.findByIdAndDelete(ID)
    .then( res.status(200).json({status:200,message:"Deleted successfully", data: await DB()}) )
    .catch( err =>{res.status(400).json({status: 400, error:true, message: err})} )
})


//==== step 10 UPDATE ====

app.patch("/movies/update/:ID", (req, res)=>{

    const ID = req.params.ID;
    const title = req.query.title;
    const year = parseInt(req.query.year);
    const rating = parseInt(req.query.rating);


movies.findById(ID)
    .then((result)=>{
        if(title !== undefined && title !== "")
            {result.title = title};
        if(!isNaN(year) && year.toString().length === 4 )
            {result.year = year};
        if(rating !== undefined && rating !== "" && !isNaN(rating) )
            {result.rating = rating};
    result.save()
    movies.find().then( result=>{res.status(200).json({status:200, message:"updated successfully", data: result})})
    })
    .catch(err=>{res.status(404).json({status:404, error: true, message: err})})
})



app.listen(3005, function(){console.log("app is listening  to port 3005")})