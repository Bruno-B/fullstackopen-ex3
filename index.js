require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const { response } = require("express");
app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :log")
);
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/info", (req, res) => {
  const date = Date(Date.now());
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
    ${date}`);

  res.status(204).end();
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: "name is missing",
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: "number is missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((err) => {
      res.status(500).json({
        error: "name must be unique",
      });
    });
});
app.delete("/api/persons/:id", (req, res) => {

  Person.findByIdAndRemove(req.params.id)
  .then(result => {
    res.status(204).end()
  })
  .catch(err => next(error))
});

morgan.token("log", function (req, res) {
  return JSON.stringify(req.body);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
