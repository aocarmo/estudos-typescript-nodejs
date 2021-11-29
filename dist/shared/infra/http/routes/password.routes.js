"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRoutes = void 0;

var _express = require("express");

var _ResetPasswordUserController = require("@modules/accounts/userCases/resetPasswordUser/ResetPasswordUserController");

var _SendForgotPasswordMailController = require("@modules/accounts/userCases/sendForgotPasswordMail/SendForgotPasswordMailController");

const passwordRoutes = (0, _express.Router)();
exports.passwordRoutes = passwordRoutes;
const sendForgotPasswordMailController = new _SendForgotPasswordMailController.SendForgotPasswordMailController();
const resetPasswordUserController = new _ResetPasswordUserController.ResetPasswordUserController();
passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordUserController.handle);