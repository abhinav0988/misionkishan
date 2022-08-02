const productModel = require("../models/productModel");

exports.createProduct = async function (req, res) {
  try {
    let Data = req.body;
    let { Name, Quantity, Amount, ...rest } = Data;
    if (Object.keys(rest).length > 0) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid attribute in request body" });
    }

    if (Object.keys(Data).length == 0) {
      return res.status(400).send({
        status: false,
        msg: " req body can't be empty, BAD REQUEST",
      });
    }
    if (!Name) {
      return res.status(400).send({
        status: false,
        msg: "Name is required",
      });
    }

    if (!Quantity) {
      return res.status(400).send({
        status: false,
        msg: "Quantity is required",
      });
    }
    if (!Amount) {
      return res.status(400).send({
        status: false,
        msg: "Amount is required",
      });
    }

    if (isNaN(Quantity)) {
      return res.status(400).send({
        status: false,
        msg: "Quantity should be in number",
      });
    }

    if (isNaN(Amount)) {
      return res.status(400).send({
        status: false,
        msg: "Amount should be in number",
      });
    }

    if (Amount < 0) {
      return res.status(400).send({
        status: false,
        msg: "Amount should be in positive integers",
      });
    }

    let productCreated = await productModel.create(Data);

    return res.status(201).send({
      status: true,
      msg: "product created successfully",
      data: productCreated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message });
  }
};
exports.getproduct = async function (req, res) {
  try {
    let productId = req.params;
    if (!productId)
      res
        .status(400)
        .send({ status: false, message: "please enter productId" });

    const findProduct = await await productModel
      .find({ _id: productId })
      .sort(findProduct.Quantity)
      .reverse(findProduct.Quantity)
    if (!object.keys(findProduct).length == 0)
      res.status(400).send({ status: false, message: "product not found" });
    return res
      .status(200)
      .send({ status: true, message: "Success", data: findProduct });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};
