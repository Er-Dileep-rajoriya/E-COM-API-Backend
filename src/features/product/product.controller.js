import ApplicationError from "../../error-handler/applicationError.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(_, res) {
    try {
      const Products = await this.productRepository.getAll();

      if (!Products) {
        return res.status(404).send("Products Not Found!");
      }
      return res.status(200).send(Products);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong!", 500);
    }
  }

  // adding one product
  async addProduct(req, res) {
    try {
      console.log("req.body : ", req.body);
      const imageUrl = req.file.filename;
      const { name, price, desc, category, sizes } = req.body;

      const newProduct = new ProductModel(
        name,
        parseFloat(price),
        desc,
        category,
        imageUrl,
        sizes.split(",")
      );

      // push product to database
      const createdRecord = await this.productRepository.add(newProduct);

      if (!createdRecord) {
        return res.status(500).send("Error in database while Adding Product");
      }

      return res.status(201).send(createdRecord);
    } catch (err) {
      console.log(err);
    }
  }

  async getOneProduct(req, res) {
    try {
      let id = req.params.id;

      const Product = await this.productRepository.getOne(id);

      if (Product) {
        return res.status(200).send(Product);
      }

      return res.status(404).send("Product Not Found!");
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong!", 500);
    }
  }

  async filterProduct(req, res) {
    try {
      let { minPrice, maxPrice, category } = req.query;

      minPrice = parseFloat(minPrice);
      maxPrice = parseFloat(maxPrice);
      const filteredProducts = await this.productRepository.filter(
        minPrice,
        maxPrice,
        category
      );

      console.log("FiltereProducts : ", filteredProducts);

      if (filteredProducts.length <= 0) {
        return res.status(404).send("No Product Found!");
      }

      return res.status(200).send(filteredProducts);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong!", 500);
    }
  }

  async rateProduct(req, res) {
    try {
      const userId = req.userId;
      const productId = req.body.productId;
      const rating = req.body.rating;

      const product = await this.productRepository.rate(
        userId,
        productId,
        rating
      );

      if (!product) {
        return res.status(404).send("Product Not Found");
      }

      return res.status(201).send("Successfully rated!");
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wront!", 500);
    }
  }
}
