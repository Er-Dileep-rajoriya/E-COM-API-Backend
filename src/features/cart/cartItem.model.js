export default class CartItemModel {
  constructor(userId, productId, qty, id) {
    this._id = id;
    this.userId = userId;
    this.productId = productId;
    this.qty = qty;
  }

  static delete(itemId, userId) {
    const cartItemIndex = cartItems.findIndex(
      (item) => item.id == itemId && item.userId == userId
    );

    if (cartItemIndex == -1) {
      return "Item Not Found in Your cart!";
    } else {
      cartItems.splice(cartItemIndex, 1);
    }
  }
}

let cartItems = [new CartItemModel(1, 1, 2, 1)];
