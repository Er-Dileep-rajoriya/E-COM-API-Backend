import { getDB } from "../../config/mongodbConfig.js";

export default class UserRepository {
  constructor() {
    this.collectionName = "users";
  }

  async signUp(newUser) {
    const db = getDB;

    try {
      // create a collection
      const collection = db.collection(this.collectionName);

      // insert a document in collection
      await collection.insertOne(newUser);

      return newUser;
    } catch (err) {
      console.log(err);
      throw new ApplicationError(
        "Something went wrong with Database while SignUp!",
        500
      );
    }
  }

  async signIn(email, password) {
    try {
      const db = getDB;

      const collection = db.collection(this.collectionName);

      return await collection.findOne({ email, password });
    } catch (err) {
      console.log(err);
    }
  }

  // find user by email in database
  async findByEmail(email) {
    try {
      const db = getDB;

      const collection = db.collection(this.collectionName);

      return collection.findOne({ email });
    } catch (err) {
      console.log(err);
    }
  }
}
