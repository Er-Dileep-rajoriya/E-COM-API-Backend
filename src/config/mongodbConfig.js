import { MongoClient } from "mongodb";

let getDB;

const connectToMongodb = async () => {
  try {
    const client = await MongoClient.connect(process.env.DB_URL);
    getDB = client.db();
    console.log("Connected to MongoDB.");
    // Access the database if needed
    // const db = client.db();
  } catch (error) {
    console.error("Error in Connecting MongoDB:", error);
  }
};

export { getDB };

// export const getDB = () => {
//   return client.db();
// };

export default connectToMongodb;
