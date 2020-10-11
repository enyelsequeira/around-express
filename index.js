const express = require("express");
const path = require("path");
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const mongoose = require("mongoose");

// listen to port 3000
const { PORT = 3000 } = process.env;

const app = express();

const connectionURL = "mongodb://localhost:27017/aroundb";

mongoose
  .connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", userRouter);
app.use("/", cardRouter);

//in case route is not defined
app.use((req, res) => {
  res.status(404).send({ message: "Requested Resource not found" });
});
