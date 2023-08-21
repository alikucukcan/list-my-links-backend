const express = require("express");
const UserModel = require("./models/schemas/user.model");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.get("/users", async (req, res) => {
  try {
    let users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.log("errr", error);
    res.json(error);
  }
});

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(8080, () => {
      console.log("Server is running on http://localhost:8080");
    });
  })
  .catch((error) => console.log(`${error} `));
