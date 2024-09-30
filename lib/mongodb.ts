import { MongoClient, MongoClientOptions } from 'mongodb';

// Extend the global object with the MongoDB connection promise in development mode
declare global {
  // Extend the global object to include _mongoClientPromise
  namespace NodeJS {
    interface Global {
      _mongoClientPromise?: Promise<MongoClient>;
    }
  }
}

const uri = process.env.MONGODB_URI || '';
const options: MongoClientOptions = {};

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env');
}

let client: any;
let clientPromise: Promise<MongoClient>;

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;
