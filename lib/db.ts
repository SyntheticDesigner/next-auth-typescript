import { MongoClient } from "mongodb";
const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.uozx1.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

export const connectToDatabase = async () => {
  const client: MongoClient = await MongoClient.connect(connectionString);
  return client;
};
