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


//==== step 5 CRUD ====

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]


app.get("/movies/create", (req, res)=>{});
app.get("/movies/read", (req, res)=>{res.json({status: 200, data: movies})});
app.get("/movies/update", (req, res)=>{});
app.get("/movies/delete", (req, res)=>{});


//==== step 6 search ====

app.get("/movies/read/by-date", (req, res)=>{ 
    res.json({status:200, data: movies.sort((a,b)=>{return (b.year - a.year)})})   
})

app.get("/movies/read/by-rating", (req, res)=> {
    res.json({status:200, data: movies.sort((a, b)=>{return (b.rating -a.rating)})})
})

app.get("/movies/read/by-title", (req, res)=>{
    res.json({status:200, data: movies.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      })})
})


//==== step 7 Read one ====

app.get("/movies/read/id/:ID", (req, res)=>{

    let ID = parseInt(req.params.ID)
    if (ID >= movies.length || ID < 0)
        {res.status(404).json({status: 404, error:true, message: "the movie <ID> does not exist"})}
    else {
        res.json({status:200, Data:movies[ID]})
    }
}
)


//==== step 8 CREATE ====

app.get("/movies/add", (req, res)=>{

    const title = req.query.title;
    const year = parseInt(req.query.year);
    const rating = req.query.rating || 4;

    if(title === undefined || title ==="" || isNaN(year) || year.toString().length < 4)
        {res.status(403).json({status: 403, error: true, message: "you cannot creat a movie without providing a title and a year"})}
    else {
        movies.push({title: title, year: year, rating: rating})
        res.status(200).json({status:200, data: movies})
        }
}
)

//==== step 9 DELETE ====

app.get("/movies/delete/:ID", (req, res)=>{

    const ID = req.params.ID

    if(ID < 0 || ID >= movies.length)
        {res.status(404).json({status:404, error: true, message:"the movie <ID> does not exist"})}
    else
        {movies.splice(ID, 1);
        res.status(200).json({status:200, Data: movies})}
})