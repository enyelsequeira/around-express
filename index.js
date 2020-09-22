const express = require("express");
const app = express();
const path = require("path");
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const test = "./public";

// listen to port 3000
const { PORT = 3000 } = process.env;
// app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", userRouter);
app.use("/", cardRouter);

//in case route is not defined
app.use(function (req, res) {
  res.status(404).send({ message: "Requested Resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening at port new changes ${PORT}`);
});
