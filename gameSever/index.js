const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
let score = 0;
app.use(cors());

app.use(cors({
  origin: "*"
}));

app.get('/score',(req, res)=>{
  score += 1
  res.send({count: score})
  console.log(res)
})


app.listen(8080, () => {
  console.log("SERVER IS RUNNING");
});


