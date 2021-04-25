const Queries = require("../queries/product.queries");
const fs = require("fs");

module.exports = {
  list: async (req, res, next) => {
    try {
      const productList = await Queries.getProductList();
      res.status(200).json({
        status: 200,
        result: productList,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Erreur de get Product",
      });
    }
  },
  show: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await Queries.getProductById(id);
      if (!product) {
        res.status(404).json({
          status: 404,
          message: "not-found",
        });
      } else {
        res.status(200).json({
          status: 200,
          result: product,
        });
      }
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Erreur lors de la recupération par id",
        error: e,
      });
    }
  },
  create: async (req, res, next) => {
    if (!req.file) {
      res.status(500).json({
        status: 500,
        message: "image required",
      });
    }
    const product = JSON.parse(req.body.product);
    delete product._id;
    try {
      const body = {
        ...product,
        image: `${req.protocol}://${req.get("host")}/images/products/${
          req.file.filename
        }`,
      };

      const savedProduct = await Queries.saveProduct(body);
      res.status(200).json({
        status: 200,
        message: "produit Sauvegarder avec succes",
      });
    } catch (e) {
      res.status(500).json({
        message: "Echec de la sauvegade des données",
        error: e,
      });
    }
  },
  update: async (req, res, next) => {
    const id = req.params.id;
    const product = JSON.parse(req.body.product);
    if (req.file) {
      try {
        product.image = `${req.protocol}://${req.get("host")}/images/products/${
          req.file.filename
        }`;
        const oldImage = await Queries.getImageProduct(id);
        console.log("oldi:" + oldImage);
        fs.unlink(`public/images/products/${oldImage}`, (err) => {
          next(err);
        });
      } catch (e) {
        res.status(500).json({
          statut: 500,
          message: "Erreur lors de la recupération de l'image",
        });
      }
    }
    try {
      const updatedProduct = await Queries.updateOneProduct(id, product);
      res.status(200).json({
        status: 200,
        message: "product updated",
      });
    } catch {
      res.status(500).json({
        status: 500,
        message: "erreur d'update",
      });
    }
    //     const filename = product.image.split('/products/')[1];
    //     fs.unlink(`public/images/products/${filename}`,(err)=>{
    //         next(err);
    //     });
    //     let updatedProduct = await Queries.getProductById(id);
    //     console.log(updatedProduct);
    //         updatedProduct.name = req.body.name ? req.body.name : updatedProduct.name;
    //         updatedProduct.description = req.body.description ? req.body.description : updatedProduct.description;
    //         updatedProduct.price = req.body.price ? req.body.price : updatedProduct.price;
    //         updatedProduct.stock = req.body.stock ? req.body.stock : updatedProduct.stock;
    //         updatedProduct.userId = req.body.userId ? req.body.userId : updatedProduct.userId;
    //         updatedProduct.createdAt = req.body.createdAt ? req.body.createdAt : updatedProduct.createdAt;
    //         if(req.file){
    //             const oldImage = updatedProduct.image.split('/products/')[1];
    //             updatedProduct.image = `${req.protocol}://${req.get('host')}/images/products/${req.file.filename}`;
    //             fs.unlinkSync(`public/images/products/${oldImage}`);
    //         }
    //          updatedProduct.save().then(()=>{
    //              res.status(200).json({
    //                  status:200,
    //                  message: 'Update reussi'
    //              })
    //          }).catch((err)=>{
    //              console.log(err);
    //          })
    // }catch(e){
    //     res.status(500).json({
    //         message: "Echec de la rercupération des données",
    //         error: e
    //     })
  },
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedProduct = await Queries.deleteProductById(id);
      const oldImage = deletedProduct.image.split("/products/")[1];
      fs.unlink(`public/images/products/${oldImage}`, (err) => {
        next(err);
      });
      res.status(200).json({
        status: 200,
        message: "produit supprimé",
      });
    } catch (e) {
      res.status(404).json({
        status: 404,
        message: "not-found",
        error: e,
      });
    }
  },
};
