import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodbConfig.js";

export default class CartItemRepository {
  constructor() {
    this.collectionName = "cartItems";
  }

  async add(newItem) {
    try {
      const { productId, userId, qty } = newItem;

      const db = getDB;
      const collection = db.collection(this.collectionName);

      //   return await collection.insertOne({
      //     productId: new ObjectId(productId),
      //     userId: new ObjectId(userId),
      //     qty,
      //   });

      // using the upsert to add and update the document, if upsert is true then
      // it will udate the document if field is present otherwise it will create new field

      return await collection.updateOne(
        {
          userId: new ObjectId(userId),
          productId: new ObjectId(productId),
        },
        {
          $inc: {
            qty: qty,
          },
        },
        { upsert: true }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async get(userId) {
    try {
      const db = getDB;

      const collection = db.collection(this.collectionName);
      return await collection
        .find({
          userId: new ObjectId(userId),
        })
        .toArray();
    } catch (err) {
      console.log(err);
    }
  }

  async delete(itemId, userId) {
    try {
      const db = getDB;
      const collection = db.collection(this.collectionName);

      return await collection.deleteOne({
        _id: new ObjectId(itemId),
        userId: new ObjectId(userId),
      });
    } catch (err) {
      console.log(err);
    }
  }
}
