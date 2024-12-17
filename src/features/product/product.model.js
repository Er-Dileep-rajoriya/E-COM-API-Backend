export default class ProductModel {
  constructor(name, price, desc, category, imageUrl, sizes, id) {
    this._id = id;
    this.name = name;
    this.price = price;
    this.desc = desc;
    this.category = category;
    this.imageUrl = imageUrl;
    this.sizes = sizes;
  }
}

const Products = [
  new ProductModel(
    1,
    "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    109.95,
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "men's clothing",
    "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",

    ["S", "M", "L", "XL"] // Sizes added
  ),
  new ProductModel(
    2,
    "Mens Casual Premium Slim Fit T-Shirts",
    22.3,
    "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And solid stitched shirts with round neck made for durability and a great fit for casual fashion wear.",
    "men's clothing",
    "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",

    ["S", "M", "L", "XL"]
  ),
  new ProductModel(
    3,
    "Mens Cotton Jacket",
    55.99,
    "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling, or other outdoors.",
    "men's clothing",
    "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",

    ["M", "L", "XL", "XXL"]
  ),
  new ProductModel(
    4,
    "Mens Casual Slim Fit",
    15.99,
    "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed.",
    "men's clothing",
    "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",

    ["S", "M", "L", "XL"]
  ),
  new ProductModel(
    5,
    "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    695,
    "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    "jewelery",
    "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
  ),
  new ProductModel(
    6,
    "Solid Gold Petite Micropave",
    168,
    "Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and sold by Hafeez Center in the United States.",
    "jewelery",
    "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg"
  ),
  new ProductModel(
    7,
    "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    39.99,
    "Lightweight, perfect for trip or casual wear. Long sleeve with hooded, adjustable drawstring waist design, button and zipper front closure raincoat.",
    "women's clothing",
    "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",

    ["S", "M", "L", "XL", "XXL"]
  ),
  new ProductModel(
    8,
    "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    29.95,
    "Faux leather material for style and comfort, 2 pockets in the front. Detail stitching at sides, with a hooded design for extra style.",
    "women's clothing",
    "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",

    ["S", "M", "L", "XL"]
  ),
  new ProductModel(
    9,
    "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    64,
    "USB 3.0 and USB 2.0 Compatibility, Fast data transfers, improve PC Performance, high capacity.",
    "electronics",
    "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"
  ),
];
