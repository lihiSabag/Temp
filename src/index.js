const express = require("express");
const mongoose = require("mongoose");
const { signup, login } = require("../controllers/user");
const { addTraining } = require("../controllers/trainer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(
  `mongodb+srv://LihiSabag:1234512345@pm-web-api.p22dw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected!");
});

// Set EJS as templating engine
app.set("view engine", "ejs");



app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// for parsing application to x-www-form-urlencoded
app.use(express.json());

// app.use(cookieParser());


app.listen(port, () => {
  console.log("server is up and running");
});

//Routing for the GET request methods
//var status = "false";
var connected ;

app.get("/", (req, res) => {
 
  res.render("pages/homePage",{connected:connected});
});

app.get("/signUp", (req, res) => {
  var status = "true";
 
  res.render("pages/signUp", { status: status ,connected:connected});
});

app.get("/login", (req, res) => {
  var loginStatus ='true';
  res.render('pages/login',{loginStatus: loginStatus,connected:connected});
  
});
app.get("/calendar", (req, res) => {
  res.render("pages/calendar");
  
});
app.get("/homePage", (req, res) => {
  res.render("pages/homePage");
});


// app.get("/wellcomePage", wellcome);
app.get("/BusinessProfile", (req, res) => {
  connected ="true";
  res.render("pages/BusinessProfile",{connected:connected});
});

app.get("/CreateBusinessP", (req, res) => {
  connected ="true";
  res.render("pages/CreateBusinessP",{connected:connected});
});
app.get("/editBusinessP", (req, res) => {
  res.render("pages/editBusinessP");
});
app.get("/Delete_Account", (req, res) => {
  connected ="true";
  res.render("pages/Delete_Account",{connected:connected});
});
app.get("/Log-In-page", (req, res) => {
  connected ="true";
  res.render("pages/Log-In-page",{connected:connected});
});

app.get("/about_page", (req, res) => {
  res.render("pages/about_page");
});
app.get("/EditTrainingTypes", (req, res) => {
  connected ="true";
  res.render("pages/EditTrainingTypes");
});
app.get("/logout", (req, res) => {
  connected = "false";
  res.render("pages/homePage",{connected:connected});
});


app.post("/log", login);
app.post("/signup", signup);
app.post("/new",addTraining);
app.post("/wellcomePage");