// SetUp
// mkdir file-system-api-Day39
// cd file-system-api-Day39
// npm init -y  //New project initialize with NPM
// npm install express

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