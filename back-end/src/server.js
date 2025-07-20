import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
/**
 * Server config
 */

const app = express();
const serverPort = process.env.PORT || 8000;

app.use(express.json());

/**
 * Connect to MongoDB
 */

let db;

async function connectToDB() {
  const uri = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();
  db = client.db('vite-mern');
}

/**
 * Endpoints
 */

app.get('/api/articles/:name', async (req, res) => {
  const { name } = req.params;
  const article = await db.collection('articles').findOne({ name });

  res.json(article);
});

app.post('/api/articles/:name/upvote', async (req, res) => {
  const { name } = req.params;
  const updatedArticle = await db.collection('articles').findOneAndUpdate(
    { name },
    {
      $inc: { upvotes: 1 },
    },
    { returnDocument: 'after' },
  );

  res.json(updatedArticle);
});

app.post('/api/articles/:name/comments', async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;
  const newComment = { postedBy, text };

  const updatedArticle = await db.collection('articles').findOneAndUpdate(
    { name },
    {
      $push: { comments: newComment },
    },
    { returnDocument: 'after' },
  );

  res.json(updatedArticle);
});

/**
 * Server launch
 */

async function start() {
  await connectToDB();
  app.listen(serverPort, () => {
    console.log(`Server listening on port ${serverPort}`);
  });
}

start();
