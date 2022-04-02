import mongoose from 'mongoose';

function isValid(value) {
  if (typeof value === 'undefined' || value === null) return false;
  if (typeof value === 'string' && value.trim().length === 0) return false;
  return true;
}

function isValidId(Id) {
  return mongoose.Schema.Types.Id;
}

function isValidBody(body) {
  return Object.keys(body).length !== 0;
}

let isValidEmail = function (email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())) {
    return true;
  }
};

export { isValid, isValidId, isValidBody, isValidEmail };
