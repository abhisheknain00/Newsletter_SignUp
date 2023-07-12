
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/097d66e3c4";

    const options = {
        method: "POST",
        auth: "abhi1:3c6a3d0ef91e85fc0662aa69707500c3-us21"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function(d){
            console.log(JSON.parse(d));
        })
    });

    request.write(jsonData);
    request.end();

});


app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000.");
});



//API Key
// 3c6a3d0ef91e85fc0662aa69707500c3-us21

// List/Audience ID
// 097d66e3c4