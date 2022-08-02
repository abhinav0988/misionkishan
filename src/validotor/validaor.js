const mongoose = require("mongoose");

const isValid = (value) => {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidName = (name) => {
  if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z])$/i.test(name)) return true;
};

const isValidEmail = (email) => {
  if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) return true;
};

function isValidPhone(phone) {
  if (/^[6-9][0-9]{9}$/.test(phone)) return true;
  else return false;
}
const isValidPrice = function (data) {
  if (/^[0-9]{2,5}\.[0-9]{2}$/.test(data)) {
    return true;
  }
  return false;
};

const isValidpassword = function (password) {
  let checkPassword = /^[a-zA-Z0-9!@#$%^&*]{8,15}$/;
  if (checkPassword.test(password)) {
    return true;
  }
  return false;
};

const isValidObjectId = function (userId) {
  return mongoose.Types.ObjectId.isValid(userId);
};

module.exports = {
  isValid,
  isValidEmail,
  isValidName,
  isValidPhone,
  isValidpassword,
  isValidObjectId,
  isValidPrice,
  
};
