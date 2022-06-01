
const express = require("express");
const request = require("request");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req,res){
const firstName = req.body.fname;
const lastName = req.body.lname;
const email = req.body.email;

  const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);
  const url =  "https://us6.api.mailchimp.com/3.0/lists/95269f6f66"
  const options = {
    method: "POST",
    auth: "Tanya:163b913d147234d6b01347fb9e3e89d4-us6"
  }

  const request = https.request(url, options, function(response){

    if(response.statusCode==200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }

     response.on("data", function(data){
       console.log(JSON.parse(data));
     })
  })
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req,res){
  res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running");
});

// 163b913d147234d6b01347fb9e3e89d4-us6
// 95269f6f66
