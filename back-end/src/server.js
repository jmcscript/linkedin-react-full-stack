import express from 'express';

const articleInfo = [
  { name: 'learn-node', upvotes: 0 },
  { name: 'learn-react', upvotes: 0 },
  { name: 'learn-mongodb', upvotes: 0 },
];

/**
 * Server config
 */

const app = express();
const serverPort = process.env.PORT || 8000;

app.use(express.json());

/**
 * Endpoints
 */

// app.get('/hello', function (req, res) {
//   res.send('Hello from a GET endpoint!');
// });

// app.get('/hello/:name', function (req, res) {
//   const name = req.params.name;
//   res.send(`Hello ${name}, from a GET endpoint!`);
// });

// app.post('/hello', function (req, res) {
//   const name = 'name' in req.body ? req.body.name : null;

//   if (name) {
//     res.send(`Hello ${name}, from a POST endpoint!`);
//   }

//   res.send('Hello from a POST endpoint!');
// });

app.post('/api/articles/:name/upvote', (req, res) => {
  const article = articleInfo.find((a) => a.name === req.params.name) || null;

  if (article) {
    ++article.upvotes;
    res.send(`Success, the ${req.params.name} article now has ${article.upvotes} upvotes.`);
  } else {
    res.send(`Failure, the ${req.params.name} article could not be found.`);
  }
});

/**
 * Server launch
 */

app.listen(serverPort, () => {
  console.log(`Server listening on port ${serverPort}`);
});
