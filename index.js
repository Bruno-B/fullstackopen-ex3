const express = require("express");
const app = express();

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

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
    const date = Date(Date.now());
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
    ${date}`)
  
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

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
