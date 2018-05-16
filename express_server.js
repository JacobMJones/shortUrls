var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080; // default port 8080
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.end("Hello!");
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

//EDIT url
app.post("/urls/:id", (req, res) => {
  const id = req.params.id;
 // const url = req.body.longURL;
 const url = urlDatabase[id];
console.log('in edit', id, url);
  
  if (url) {
    console.log('in change url');
     urlDatabase[id] = req.body.longURL;
     res.redirect("/urls")
  } else {
    console.log('NOT in change url');
    res.redirect("/urls")
  }
});




app.post("/urls", (req, res) => {
  console.log(req.body);
  let randomId = generateRandomString();
  let htmlAddress = req.body.longURL;

  urlDatabase[randomId] = htmlAddress;
  res.redirect(`urls/${randomId}`);
});

app.post("/urls/:id/delete", (req, res) => {
  const idToDelete = req.params.id;
  const urlToDelete = urlDatabase[idToDelete];

  if (urlToDelete) {
    delete urlDatabase[idToDelete];
    
  }
  res.redirect("/urls");
});
//delete Employee.firstname;



app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/u/:shortURL", (req, res) => {
  let shortURL = req.params.shortURL;
  let longURL = urlDatabase[shortURL];
  res.redirect(longURL);
});

app.get("/urls", (req, res) => {
  let templateVars = {
    urls: urlDatabase
  }
  res.render("urls_index", templateVars);
});

// the : denotes a variable will follow
app.get("/urls/:id", (req, res) => {
  let templateVars = {
    shortURL: req.params.id,
    longURL: urlDatabase[req.params.id]
  };
  //shortUrl is the variable name the ejs page will use
  //req.params.id is the value of the shortUrl variable/key
  res.render("urls_show", templateVars);
});


app.get("/hello", (req, res) => {
  res.end("<html><body>Hello <b>World</b></body></html>\n");
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});



function generateRandomString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  console.log(text);
  return text;
};