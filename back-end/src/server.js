import express from 'express';
import admin from 'firebase-admin';
import { MongoClient, ServerApiVersion } from 'mongodb';
import credentials from '../credentials.json' with { type: 'json' };

/**
 * Firebase Config
 */

/**
 * I decided to import the JSON instead of importing the 'fs' library. Further study explains that it is more common
 * to store this information in a .env file or ENVIRONMENT VARIABLES. Either way, it seems to work my way.
 */

// import fs from 'fs';
// const credentials = JSON.parse(fs.readFileSync('./credentials.json'));

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

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

  if (!(postedBy && typeof postedBy === 'string' && postedBy.length > 0))
    return res.status(400).json({ message: 'postedBy is required and must not be empty.' });

  if (!(text && typeof text === 'string' && text.length > 0))
    return res.status(400).json({ message: 'text is required and must not be empty.' });

  const updatedArticle = await db.collection('articles').findOneAndUpdate(
    { name },
    {
      $push: { comments: { postedBy, text } },
    },
    { returnDocument: 'after' },
  );

  res.status(200).json(updatedArticle);
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
