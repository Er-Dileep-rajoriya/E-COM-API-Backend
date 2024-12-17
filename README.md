# E-Commerce REST API

A backend project built using **Express.js**, **Node.js**, and **MongoDB** to manage core functionalities of an e-commerce platform. The API includes user authentication, product management, and cart operations, secured using **JWT**.

---

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Multer**
- **RESTful-APIs**
- **JWT (JSON Web Token)**

---

## Features

### UserController _(JWT Secured)_

- **Sign Up User**  
  Registers a new user. Fields:

  - `id`, `name`, `email`, `typeOf` (seller or buyer)

- **Sign In User**  
  Authenticates user credentials and provides a JWT token.

### ProductController _(JWT Secured)_

- **Get All Products**  
  Retrieves a list of all products.

- **Add a Product**  
  Allows adding a new product to the database.

- **Get One Product**  
  Fetches details of a single product by `ProductId`.

- **Filter Product**  
  Filters products based on specific query parameters.

- **Rate a Product** _(JWT Secured)_  
  Allows a logged-in user to rate a product using:
  - `userId` (from JWT payload after login)
  - `ProductId` and `rating` (out of 5 or 10)

### CartItemController _(JWT Secured)_

- **Add to Cart**  
  Adds an item to the user's cart.

  - Requires `userId` (from JWT), `productId`, `quantity`, and `id`.

- **Get Cart Items**  
  Retrieves all items in the logged-in user's cart.

- **Remove Cart Item**  
  Removes an item from the cart.
  - Requires `userId` and `cartItemId`.

---

## Installation and Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-commer-rest-api
   ```
