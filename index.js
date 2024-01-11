var express = require("express");
var bodyParser = require("body-parser");
var { exec } = require("child_process");
var app = express();
const server = require("http").Server(app);

currentData = {
    "build": "",
}

// Use express to get the post data
app.use(bodyParser.urlencoded({ extended: true }))

server.listen(1314, function () {
    console.log("En ligne sur localhost:1314 !");
})

app.get("/buildprocess", (req, res) => {
    // execute the build process
    exec("hugo -D -E -F", (error, stdout, stderr) => {
        if (error) {
            console.error(`Error during build process: ${error.message}`);
            currentData.build = "fail";
        } else {
            console.log(`Build process successful: ${stdout}`);
            currentData.build = "success";
        }
        res.status(200).json(currentData);
    });
});
