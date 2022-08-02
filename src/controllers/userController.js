const usermodel = require("../models/userModel");
const Validator = require("../validotor/validaor");
const jwt = require("jsonwebtoken");

const createUser = async function (req, res) {
  try {
    let data = req.body;
    let { fname, lname, email, phone, password, ...rest } = data;
    if (!rest)
      res
        .status(400)
        .send({ status: false, message: "No others key is allowed" });

    if (Object.keys(data).length == 0)
      res
        .status(400)
        .send({ status: false, message: "No others key is allowed" });

    if (!Validator.isValid(fname))
      return res
        .status(400)
        .send({ status: false, message: "please enter fname" });
    if (!Validator.isValidName(fname))
      return res
        .status(400)
        .send({ status: false, message: "please valid fname" });
    if (!Validator.isValid(lname))
      return res
        .status(400)
        .send({ status: false, message: "please enter lname" });
    if (!Validator.isValidName(lname))
      return res
        .status(400)
        .send({ status: false, message: "please valid lname" });
    if (!Validator.isValid(email))
      return res
        .status(400)
        .send({ status: false, message: "please enter email" });
    if (!Validator.isValidEmail(email))
      return res
        .status(400)
        .send({ status: false, message: "please enter valid email" });
    if (!Validator.isValid(phone))
      return res
        .status(400)
        .send({ status: false, message: "please enter phonenumber" });
    if (!Validator.isValidPhone(phone))
      return res
        .status(400)
        .send({ status: false, message: "please enter valid phonenumber" });
    if (!Validator.isValid(password))
      return res
        .status(400)
        .send({ status: false, message: "please enter password" });
    if (!Validator.isValidpassword(password))
      return res
        .status(400)
        .send({ status: false, message: "please enter valid password" });

    const uniqueemail = await usermodel.findOne({ email: email });
    if (uniqueemail)
      return res
        .status(400)
        .send({ status: false, message: "emailId already exist" });
    const uniquephone = await usermodel.findOne({ phone: phone });
    if (uniquephone)
      return res
        .status(400)
        .send({ status: false, message: "phonenumber already exist" });

    let result = await usermodel.create(data);
    return res.status(201).send({
      status: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const loginUser = async function (req, res) {
  try {
    const requestbody = req.body;
    if (!Validator.isValid(requestbody)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter mailId and password " });
    }
    const { email, password } = requestbody;

    // // to check the email is present
    if (!Validator.isValid(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter the Email Id" });
    }

    // // to validate the emailId
    if (!Validator.isValidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter valid emailId" });
    }

    // // to check the password is Present
    if (!Validator.isValid(password)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter the password" });
    }

    // // to validate the password in given length
    if (!Validator.isValidpassword(password)) {
      return res.status(400).send({
        status: false,
        msg: "password should be have minimum 8 character and max 15 character",
      });
    }

    const user = await usermodel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ status: false, msg: "No such user found" });
    }
 
//jwt token
    let token = jwt.sign(
      {
        userId: user._id.toString(),
        project: "Project-5",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60,
      },
      "company"
    );

    res.header("Authorization", "Bearer:" + token);
    return res.status(200).send({
      status: true,
      message: "SuccessFully loggedIn",
      data: { userId: user._id, token: token },
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: "error" });
  }
};

const getuserdata = async function (req, res) {
  try {
    let result = req.params.userId;
    if (!result)
      return res
        .status(400)
        .send({ status: false, message: `please enter ${userId}` });
    if (!Validator.isValidObjectId(userId))
      return res
        .status(400)
        .send({ status: false, message: "please enter valid userId" });

    if (result != req.dtoken) {
      return res
        .status(404)
        .send({ status: false, message: "UserId doesn't match" });
    }

    const dbcall = await usermodel.findOne({ _id: result });
    if (!dbcall)
      return res
        .status(400)
        .send({ status: false, message: "No user found with this userId" });
    return res
      .status(200)
      .send({ status: true, message: "User profile details", data: dbcall });
  } catch (error) {
    return res.status(500).send({ status: false, message: "error" });
  }
};

const updateuser = async function (req, res) {
  try {
    let data = req.params.userId;
    if (!data)
      return res
        .status(400)
        .send({ status: false, message: "please enter Id in param" });
    let result = req.body;
    const { fname, lname, password } = result;

    if (!data)
      return res
        .status(400)
        .send({ status: false, message: "please enter some details" });
    if (!Validator.isValid(fname))
      return res
        .status(400)
        .send({ status: false, message: "please enter fname" });
    if (!Validator.isValidName(fname))
      return res
        .status(400)
        .send({ status: false, message: "please valid fname" });
    if (!Validator.isValid(lname))
      return res
        .status(400)
        .send({ status: false, message: "please enter lname" });
    if (!Validator.isValidName(lname))
      return res
        .status(400)
        .send({ status: false, message: "please valid lname" });

    if (!Validator.isValid(password))
      return res
        .status(400)
        .send({ status: false, message: "please enter password" });
    if (!Validator.isValidpassword(password))
      return res
        .status(400)
        .send({ status: false, message: "please enter valid password" });

    const findBook = await usermodel.findById({ _id: data });
    if (!findBook) {
      return res
        .status(404)
        .send({ status: false, message: "No book find by params" });
    }
    //
    //Authorization-if the user doesn't created the book, then won't be able to delete it.
    else if (findBook._id != req.dtoken) {
      return res.status(403).send({
        status: false,
        message: "Unauthorized access.",
      });
    }

    // to update the user
    let updateUser = await usermodel.findOneAndUpdate(
      { _id: data },
      result,

      { new: true }
    );
    return res
      .status(200)
      .send({ status: true, message: "Success", data: updateUser });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

module.exports = { createUser, loginUser, getuserdata, updateuser };
