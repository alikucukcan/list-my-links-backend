const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
// we should run config function
// dotenv package using for reach .env file and use process.env.?
dotenv.config();

//app is  our express server object
const app = express();

const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.routes");

app.use(express.json()); //body-parser
// requestz for starts with /user, userRouter will take care
app.use("/user", userRouter);
app.use("/auth", authRouter);

// connect the database when application run
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // if connected, start to listen 8080 port to recevie requests and send responses.
    app.listen(8080, () => {
      console.log("Server is running on http://localhost:8080");
    });
  }) // if not connected so there is an error , write error to console
  .catch((error) => console.log(`${error} `));
