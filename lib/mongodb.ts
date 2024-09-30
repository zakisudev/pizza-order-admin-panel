import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  ssl: true,
};

let client;
let clientPromise: any;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to prevent creating a new connection each time
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to create a new connection each time
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
