import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

/**
 * @typedef {article[]} articleInfo
 *
 */

/**
 * @typedef {Object} article
 * @property {string} name
 * @property {number} upvotes
 * @property {Object[]} comments
 */

/** @type {articleInfo} */
const articleInfo = [
  { name: 'learn-node', upvotes: 0, comments: [] },
  { name: 'learn-react', upvotes: 0, comments: [] },
  { name: 'learn-mongodb', upvotes: 0, comments: [] },
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

app.get('/api/articles/:name', async (req, res) => {
  const { name } = req.params;

  const uri = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();

  const db = client.db('vite-mern');

  const article = await db.collection('articles').findOne({ name });

  res.json(article);
});

app.post('/api/articles/:name/upvote', (req, res) => {
  const article = articleInfo.find((a) => a.name === req.params.name) || null;

  if (article) {
    ++article.upvotes;
    res.json(article);
  } else {
    res.send(`Failure, the ${req.params.name} article could not be found.`);
  }
});

app.post('/api/articles/:name/comments', (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;

  const article = articleInfo.find((a) => a.name === name) || null;

  if (article && 'comments' in article) {
    article.comments.push({
      postedBy,
      text,
    });
    res.json(article);
  } else {
    res.send(`Failure, the ${name} article could not be found.`);
  }
});

/**
 * Server launch
 */

app.listen(serverPort, () => {
  console.log(`Server listening on port ${serverPort}`);
});
