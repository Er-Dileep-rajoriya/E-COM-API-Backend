import { getDB } from "../../config/mongodbConfig.js";
import ApplicationError from "../../error-handler/applicationError.js";

export default class UserModel {
  constructor(name, email, password, type, id) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }

  static getAll() {
    return users;
  }
}

// let users = [
//   new UserModel(1, "Dileep", "Dileep@gmail.com", "dileep", "seller"),
// ];
