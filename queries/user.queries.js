const User = require("../database/models/user.model");

module.exports = {
  getUserList: () => {
    return User.find().exec();
  },
  getUserById: (id) => {
    return User.findById(id).exec();
  },
  saveNewUser: (body) => {
    const newUser = new User({
      ...body,
    });
    return newUser.save();
  },
  getUserByEmail: (email)=>{
      return User.findOne({email: email}).exec();
  }
};
