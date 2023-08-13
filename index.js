// //SetUp
// // mkdir file-system-api-Day39
// // cd file-system-api-Day39
// // npm init -y  //New project initialize with NPM
// // npm install express


// //Import required modules using require function
// const express = require('express');    // import the express module framework for nodejs
// const app = express();   // define routes, middleware,behaviour of HTTP methods like GET, POST, PUT 
// const fs = require('fs'); //filesystem module
// const PORT = 3009; //define server PORT
// const path = require('path');  // Import the path module for handling file paths
// const dirName = path.join(__dirname, 'timestamp');


// // Middleware to parse JSON data
// //  client sends data to your server inJSON data and transforms it into a JavaScript object for route handlers)
// // Without the express.json() middleware, you would need to manually parse the incoming data using something like JSON.parse(req.body)
// app.use(express.json());


// // Endpoint to create a text file
// //req to access request information and res to send a response

// app.get("/",(req, res)=>{
//     res.send("Hey Gokul this is my first server");
// })

// app.get("/date-time",(req, res)=>{
//     let date = new Date();
//     let currentTimeStamp = date.toUTCString().slice(0, -3);
//     let content = `The last updated timestamp: ${currentTimeStamp}`
//     //let changedTime = currentTimeStamp.split(/[ ,:]+/).join("");
//     let changedTime = currentTimeStamp.split(" ").join("").split(",").join("").split(":").join("");
//     console.log(dirName)
//     fs.writeFile(`${dirName}/${changedTime}.txt`, content, (err) => {
//         if (err) {
//             console.error("Error writing file:", err);
//             res.status(500).send('Error in writing the file');
//             return;
//         }
//         res.sendFile(path.join(dirName, `${changedTime}.txt`));
//     });
    
// })    



// app.listen(PORT, () => {
//     console.log(`Server is running on port like ${PORT}`);
//   });        // Here, app.listen used to start the express server and listen in port,callback fn execute if server is up and running

//? Thirty Party Packages..
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:8000",
  })
);
app.use(express.json()); // Moved after the CORS middleware

const PORT = process.env.PORT || 3004;

// Testing API endpoint
app.get("/", (req, res) => {
  res.send("Welcome!");
});

// API endpoint to create a new Folder
app.post("/Create-Folder", async (req, res) => {
  try {
    const folderPath = path.join(__dirname, "timestamp");
    fs.mkdir(folderPath, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err });
      }
      console.log("timestamp Folder created");
      res.status(200).json({ message: "timestamp Folder created" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// API endpoint to create a Text File in a particular folder
app.post("/Create-File", (req, res) => {
  const Get_Date = new Date();
  const Current_Date = Get_Date.getDate();
  const Month = Get_Date.getMonth() + 1;
  const Year = Get_Date.getFullYear();
  const Time = Get_Date.getTime();
  const FileName = `${Current_Date}-${Month}-${Year}-${Time}`;
  const TimeStamp = new Date().toISOString();

  fs.writeFile(path.join(__dirname, "timestamp", `${FileName}.txt`), TimeStamp, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to create text file" });
    }
    console.log(`Text file ${FileName} created successfully`);
    return res.status(200).json({ message: "Text file created successfully" });
  });
});

// API endpoint to retrieve the Text File names in the specified Folder
app.get("/Read-File", (req, res) => {
  fs.readdir(path.join(__dirname, "timestamp"), (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).send(err);
    }
    res.status(200).send(data);
  });
});

app.listen(PORT, () => console.log("APP LISTENING ON :", PORT));