const express = require('express');
const bodyParser = require('body-parser');
const nodeFetch = require('node-fetch');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

var api_URL = "https://super-search-akashjoshi.flexiple.now.sh/?hero=";

app.get("/home", function(req, res){
    api_URL = "https://super-search-akashjoshi.flexiple.now.sh/?hero=";
    res.render("home.ejs");
});

app.post("/hero", function(req, res){
    api_URL += req.body.superHeroName;
    res.redirect("/hero");
});

app.get("/hero", async function(req, res){

    //Unhandled promise rejection to be done.
    const response = await nodeFetch(api_URL).catch(function(err){});
    const data = await response.json();

    res.render("hero.ejs",{heroData: data});
});

app.listen(process.env.PORT || 3000, () => console.log("running!"));

