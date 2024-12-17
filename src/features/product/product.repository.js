import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodbConfig.js";
class ProductRepository {
  constructor() {
    this.collectionName = "products";
  }

  async add(newProduct) {
    try {
      const db = getDB;
      const collection = db.collection(this.collectionName);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (err) {
      console.log(err);
    }
  }

  async getOne(id) {
    try {
      const db = getDB;

      const collection = db.collection(this.collectionName);

      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      const db = getDB;
      const collection = db.collection(this.collectionName);
      return await collection.find().toArray();
    } catch (err) {
      console.log(err);
    }
  }

  async filter(minPrice, maxPrice, category) {
    try {
      const db = getDB;

      const collection = db.collection(this.collectionName);

      const query = {};

      if (minPrice) {
        query.price = { ...query.price, $gte: minPrice }; // Price greater than or equal to minPrice
      }

      if (maxPrice) {
        query.price = { ...query.price, $lte: maxPrice }; // Price less than or equal to maxPrice
      }

      if (category) {
        query.category = category; // Exact match for category
      }

      // Fetch data from MongoDB
      const products = await collection.find(query).toArray();

      return products;
    } catch (err) {
      console.error(err);
    }
  }

  // async rate(userId, productId, rating) {
  //   console.log(
  //     "Userid : ",
  //     userId,
  //     "ProductId : ",
  //     productId,
  //     "Rating : ",
  //     rating
  //   );
  //   try {
  //     const db = getDB;

  //     const collection = db.collection(this.collectionName);

  //     // find the product
  //     const product = await collection.findOne({
  //       _id: new ObjectId(productId),
  //     });
  //     console.log("product : ", product);

  //     // get the ratings object for the user
  //     const ratingsObj = product?.ratings?.find((r) => r.userId == userId);

  //     console.log("ratingsObj : ", ratingsObj);

  //     // if there is already rating given before the same user, then update that rating only
  //     if (ratingsObj) {
  //       await collection.updateOne(
  //         {
  //           _id: new ObjectId(productId),
  //           "ratings.userId": new ObjectId(userId),
  //         },
  //         {
  //           $set: {
  //             "ratings.$.rating": rating,
  //           },
  //         }
  //       );
  //     }
  //     // if there is new user
  //     else {
  //       await collection.updateOne(
  //         { _id: new ObjectId(productId) },
  //         {
  //           $push: {
  //             ratings: {
  //               rating: parseFloat(rating),
  //               userId: new ObjectId(userId),
  //             },
  //           },
  //         }
  //       );
  //     }

  //     return product;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // rate a product using pull operator
  async rate(userId, productId, rating) {
    try {
      const db = getDB;

      const collection = db.collection(this.collectionName);

      // removing the existing entry using pull operator
      await collection.updateOne(
        {
          _id: new ObjectId(productId),
        },
        {
          $pull: {
            ratings: {
              userId: new ObjectId(userId),
            },
          },
        }
      );

      // pushing new entry
      return await collection.updateOne(
        { _id: new ObjectId(productId) },
        {
          $push: {
            ratings: {
              rating: parseFloat(rating),
              userId: new ObjectId(userId),
            },
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
}

export default ProductRepository;
