const express = require("express");
const app = express();
const PORT = 8000;

//passing multiple middleWare
const checkToken = (req, res, next) => {
  let token = req.query.token;
  if (token == "give access") {
    next();
  }
  res.send("ACCESS DENIED!");
};

app.get("/api", checkToken, (req, res) => {
  res.send("data");
});
//activity
app.use("/api", (req, res) => {
  let token = req.query.token;
  if (token === "giveaccess") {
    next();
  }
  res.send("ACCESS DENIED!");
});

//my first custom middleWare
//logger - morgan
app.use((req, res, next) => {
  console.log(req.method);
  req.time = new Date(Date.now()).toString();
  console.log(req.time);
  console.log(req.hostname);
  console.log(req.path);
  next();
});

//middleWate for particular path
app.use("/random", (req, res, next) => {
  console.log("I am only for random!");
  next();
});

//404 - not found
app.use((req, res) => {
  res.send("page not found!");
});

app.get("/", (req, res) => {
  res.send("Hi, I am root!");
});
app.get("/random", (req, res) => {
  res.send("this is random page");
});

app.listen(PORT, () => {
  console.log(`server was listing at port ${PORT}`);
});
