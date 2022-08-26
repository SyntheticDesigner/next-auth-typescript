import { MongoClient } from "mongodb";

const connectToDatabase = () => {
  MongoClient.connect();
};
