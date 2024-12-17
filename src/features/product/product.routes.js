import express from "express";
import ProductController from "./product.controller.js";
import { fileUpload } from "../../middlewares/file-upload.middleware.js";
import addProductValidation from "../../middlewares/addProductValidate.middleware.js";

const ProductRouter = express.Router();

const productController = new ProductController();

ProductRouter.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});
ProductRouter.post(
  "/",
  fileUpload.single("imageUrl"),
  addProductValidation,
  (req, res) => {
    productController.addProduct(req, res);
  }
);

// filter product using query params
// localhost:3100/api/products/filter?minPrice=150&maxPrice=300&category=electronics
ProductRouter.get("/filter", (req, res) => {
  productController.filterProduct(req, res);
});

// localhost:3100/api/products/rate?userId=1&productId=1&rating=8
ProductRouter.post("/rate", (req, res) => {
  productController.rateProduct(req, res);
});

ProductRouter.get("/:id", (req, res) => {
  productController.getOneProduct(req, res);
});

export default ProductRouter;
