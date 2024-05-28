require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
// const cors = require('cors');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const uri = `mongodb+srv://escrow-app:${process.env.MONGO_DB_KEY}@cluster0.ubsrcms.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; // MongoDB connection URI
const client = new MongoClient(uri, { /*useNewUrlParser: true, useUnifiedTopology: true*/ });
//app.use(cors({ origin: 'http://localhost:3000' }));

// Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to set common response headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specified HTTP methods
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specified headers
  next(); // Pass control to the next middleware function
});

// Connection to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();

// Routes
app.get('/api/escrow', async (req, res) => {
  const database = client.db('Escrow-DB');
  const collection = database.collection('escrow-contracts');
  const data = await collection.find().toArray();
  res.json(data);
});

app.post('/api/escrow', async (req, res) => {
  const database = client.db('Escrow-DB');
  const collection = database.collection('escrow-contracts');
  const newData = req.body;
  const result = await collection.insertOne(newData);
  res.send(result);
});

app.get('/api/escrow/:id', async (req, res) => {
  const database = client.db('Escrow-DB');
  const collection = database.collection('escrow-contracts');
  const id = req.params.id;
  const data = await collection.findOne({ _id: new ObjectId(id) });
  if (!data) {
    res.status(404).send('Data not found');
  } else {
    res.send(data);
  }
});

app.options('/api/escrow', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

app.get("/", (req, res) => { res.send("Escroverse Api is working!!"); });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
