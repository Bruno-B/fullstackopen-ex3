const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors')
let persons = [
  {
    name: "Arto Artas",
    number: "3213123-232",
    id: 1,
  },
  {
    name: "Barto Bartas",
    number: "2123332-122",
    id: 2,
  },
  {
    name: "Carto Cartas",
    number: "232321-123",
    id: 3,
  },
  {
    name: "Darto Dartas",
    number: "3123123-213",
    id: 4,
  },
];



app.use(cors())
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :log")
);
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const date = Date(Date.now());
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
    ${date}`);

  res.status(204).end();
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

const generateId = () => {
  const id = Math.floor(Math.random() * 999999);
  return id;
};

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

  if (persons.filter((person) => person.name === body.name).length > 0) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  res.json(person);
});
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

morgan.token("log", function (req, res) {
  return JSON.stringify(req.body);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
