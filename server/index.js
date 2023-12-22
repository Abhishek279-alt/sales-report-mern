const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 5000;
const Product = require("./model/Product");
app.use(express.json());
app.use(cors());

const data = require("./data/products.json");

mongoose.connect("mongodb://localhost:27017/assignment", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//API to populate databse

app.post("/upload", async (req, res) => {
  let result = new Product(data);
  await result.save();
  res.send(result);
});

// API for all transactions
app.get("/search/:month/:query", async (req, res) => {
  let result = await Product.find({
    $and: [
      { $or: [{ title: { $regex: req.params.query } }] },
      { $or: [{ dateOfSale: { $regex: req.params.month } }] },
    ],
  });
  if (result) {
    res.send(result);
  } else {
    res.send({ errMsg: "Some error occured" });
  }
});
app.get("/search/:month", async (req, res) => {
  let result = await Product.find({
    $or: [{ dateOfSale: { $regex: req.params.month } }],
  });
  if (result) {
    res.send(result);
  } else {
    res.send({ errMsg: "Some error occured" });
  }
});

// Statistics API
app.get("/stats/:month", async (req, res) => {
  let result = await Product.find({
    $or: [{ dateOfSale: { $regex: req.params.month } }],
  });
  if (result) {
    res.send(result);
  } else {
    res.send({ errMsg: "Some error occured" });
  }
});

// Combined Transactions API
app.get("/stats/:month/:sold", async (req, res) => {
  let result = await Product.find({
    $and: [
      {
        $or: [{ sold: { $regex: req.params.sold } }],
      },
      { $or: [{ dateOfSale: { $regex: req.params.month } }] },
    ],
  });
  if (result) {
    res.send(result);
  } else {
    res.send({ errMsg: "Some error occured" });
  }
});

app.listen(port, () => {
  console.log(`App is listening to the port ${port}`);
});
