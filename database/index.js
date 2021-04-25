const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTION_DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection db ok");
  })
  .catch((err) => {
    console.log(err);
  });
