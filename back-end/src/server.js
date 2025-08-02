import express from 'express';
import admin from 'firebase-admin';
import fs from 'fs';
import { MongoClient, ServerApiVersion } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Firebase Config
 */

const credentials = JSON.parse(fs.readFileSync('./credentials.json'));

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
  const uri = process.env.MONGODB_USERNAME
    ? `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.qeprcou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    : 'mongodb://127.0.0.1:27017';
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

app.use(express.static(path.join(__dirname, '../dist')));

// GET -> vite dist files served for requests not starting with '/api'
app.get(/^(?!\/api).+/, (req, res) => {
  return res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// GET -> article collection
app.get('/api/articles', async (req, res) => {
  try {
    const articles = [];
    const cursor = await db.collection('articles').find().project({ name: 1, title: 1, body: 1 });
    for await (const article of cursor) {
      articles.push(article);
    }
    return res.json(articles);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// GET -> article
app.get('/api/articles/:name', async (req, res) => {
  const { name } = req.params;
  const article = await db.collection('articles').findOne({ name });

  return res.json(article);
});

// (Middleware) Going forward, process every request type using this method before moving to then next handler.
app.use(async (req, res, next) => {
  const { authtoken } = req.headers;

  if (authtoken) {
    const user = await admin.auth().verifyIdToken(authtoken);
    req.user = user;
    return next();
  }

  return res.sendStatus(400);
});

// POST -> upvote for article
app.post('/api/articles/:name/upvote', async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  const article = await db.collection('articles').findOne({ name });
  const upvoteIds = article.upvoteIds || [];
  const canUpvote = uid && !upvoteIds.includes(uid);

  if (!canUpvote) return res.sendStatus(403);

  const updatedArticle = await db.collection('articles').findOneAndUpdate(
    { name },
    {
      $push: { upvoteIds: uid },
    },
    { returnDocument: 'after' },
  );

  return res.json(updatedArticle);
});

// POST -> comment for article
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

  return res.status(200).json(updatedArticle);
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
