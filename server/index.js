require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const uri = `mongodb+srv://escrow-app:${process.env.MONGO_DB_KEY}@cluster0.ubsrcms.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; // MongoDB connection URI
const client = new MongoClient(uri, { /*useNewUrlParser: true, useUnifiedTopology: true*/ });

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();

// Define routes
app.get('/api/escrow', async (req, res) => {
  const database = client.db('Escrow-DB');
  const collection = database.collection('escrow-contracts');
  const data = await collection.find().toArray();
  res.json(data);
});

app.post('/api/escrow', async (req, res) => {
  const database = client.db('Escrow-DB');
  const collection = database.collection('escrow-contracts');
  console.log(req.body);
  const newData = req.body;
  const result = await collection.insertOne(newData);
  res.json(result);
});

app.get('/api/escrow/:id', async (req, res) => {
  const database = client.db('Escrow-DB');
  const collection = database.collection('escrow-contracts');
  const id = req.params.id;
  const data = await collection.findOne({ _id: new ObjectId(id) });
  if (!data) {
    res.status(404).send('Data not found');
  } else {
    res.json(data);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
