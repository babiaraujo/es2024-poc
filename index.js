const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// decorators
function readonly(target, bey, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Person {
  @readonly
  name = 'Babi';
}

app.get('/person', (req, res) => {
  const person = new Person();
  res.json({ name: person.name });
});

// array e object Comprehensions
app.get('/squares', (req, res) => {
  const numbers = [1, 2, 3, 4, 5];
  const squares = [for (n of numbers) n * n];
  res.json({ squares });
});

app.get('/inverted', (req, res) => {
  const obj = { a: 1, b: 2, c: 3 };
  const invertedObj = { [v]: b for ([b, v] of Object.entries(obj)) };
  res.json({ invertedObj });
});

// regExp `v` Flag
app.get('/date', (req, res) => {
  const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/v;
  const match = re.exec('2024-07-15');
  res.json({ groups: match.groups });
});

// generator Arrow Functions
app.get('/range', (req, res) => {
  const range = *=> (start, end) => {
    for (let i = start; i < end; i++) {
      yield i;
    }
  };

  const gen = range(1, 5);
  const values = [];
  for (let value of gen) {
    values.push(value);
  }
  res.json({ values });
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
