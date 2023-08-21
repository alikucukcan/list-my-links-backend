const express = require("express");
const UserModel = require("./models/user.model");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.routes");

app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRouter);

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
