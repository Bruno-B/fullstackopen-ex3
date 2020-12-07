const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const password = process.argv[2];
const url = `mongodb+srv://admin:${password}@cluster0.konem.mongodb.net/phonebook?retryWrites=true&w=majority`;
const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
    console.log('Phonebook:')
  Person.find({}).then((res) => {
    res.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });

  

} else {
  const name = process.argv[3];
  const number = process.argv[4];
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((res) => {
    mongoose.connection.close();
  });
}

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
