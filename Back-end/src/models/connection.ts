import 'dotenv/config';
import mongoose from 'mongoose';

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI
    || 'mongodb://127.0.0.1:27018/',
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;
