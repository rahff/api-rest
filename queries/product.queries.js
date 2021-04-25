const Product = require("../database/models/product.model");

module.exports = {
  getProductList: () => {
    return Product.find().exec();
  },
  getProductById: (id) => {
    console.log(id);
    return Product.findOne({ _id: id }).exec();
  },
  saveProduct: (body) => {
    const newProduct = new Product({
      ...body,
    });
    return newProduct.save();
  },
  deleteProductById: (id) => {
    return Product.findByIdAndDelete(id).exec();
  },
  getImageProduct: (id) => {
    return Product.findOne({ _id: id }, { image: true }).exec();
  },
  updateOneProduct: (id, product) => {
    return Product.updateOne({ _id: id }, { ...product }).exec();
  },
};
