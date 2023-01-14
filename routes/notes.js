const notes = require("express").Router();
const { readFromFile, readAndAppend, writeToFile } = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Tip added successfully 🚀`);
  } else {
    res.error("Error in adding tip");
  }
});

notes.delete("/:id", (req, res) => {
  readFromFile("./db/db.json").then((data) => {
    let dbData = JSON.parse(data);
    let filteredData = dbData.filter((note) => {
      return note.id !== req.params.id;
    });
    writeToFile("./db/db.json", filteredData);
    res.json(filteredData);
  });
});

module.exports = notes;
