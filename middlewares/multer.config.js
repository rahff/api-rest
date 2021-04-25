const multer = require("multer");

const MIMES_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/products");
  },
  filename: (req, file, cb) => {
    let name = Math.floor(Math.random() * Math.floor(94848428)).toString();
    name += Math.floor(Math.random() * Math.floor(54867628)).toString();
    name += Math.floor(Math.random() * Math.floor(35864628)).toString();
    name += Date.now() + ".";
    const extension = MIMES_TYPES[file.mimetype];
    name += extension;
    cb(null, name);
  },
});

module.exports = multer({ storage }).single("image");
