import CartItemModel from "./cartItem.model.js";
import CartItemRepository from "./cartItem.repository.js";

export default class CartItemController {
  constructor() {
    this.cartItemRepository = new CartItemRepository();
  }

  async addToCart(req, res) {
    try {
      const userId = req.userId;
      const { productId, qty } = req.body;

      // if any field is empty, then res back to the client
      // (can be create a middleware also using express-validator)

      if (!productId || !qty) {
        return res.status(400).send("productId and qty(quantity) is Required!");
      }

      const newItem = new CartItemModel(userId, productId, qty);

      const item = await this.cartItemRepository.add(newItem);

      return res.status(201).send(item);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong!");
    }
  }

  async getCartItems(req, res) {
    try {
      const userId = req.userId;

      const items = await this.cartItemRepository.get(userId);

      if (items.length > 0) {
        return res.status(200).send(items);
      }

      return res.status(404).send("No Items in Your Cart!");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wront!");
    }
  }

  async deleteItem(req, res) {
    try {
      const userId = req.userId;
      const itemId = req.params.id;

      const item = await this.cartItemRepository.delete(itemId, userId);
      console.log("item : ", item);
      if (!item) {
        return res.status(404).send("No item found Or Invalid item id");
      }

      return res.status(200).send("Cart Item has been removed from your cart!");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong!");
    }
  }
}
