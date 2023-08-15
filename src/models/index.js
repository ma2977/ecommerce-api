const Product = require("./Product")
const Category = require("./Category")
const Cart = require("./Cart")
const User = require("./User")
const Purchase = require("./Purchase")
const ProductImg = require("./ProductImg")


Product.belongsTo(Category)
Category.hasMany(Product)


Cart.belongsTo(User)
User.hasOne(Cart)
 

Cart.belongsTo(Product)
Product.hasMany(Cart)


Purchase.belongsTo(User)
User.hasMany(Purchase)


Purchase.belongsTo(Product)
Product.hasMany(Purchase)


ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)