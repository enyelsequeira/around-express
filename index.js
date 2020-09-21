const express = require("express");
const app = express();

// listen to port 3000
const { PORT = 3002 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
