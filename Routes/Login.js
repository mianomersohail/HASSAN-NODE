const express = require("express");
const router = express.Router();
const UserServices = require("../UserServices/UserServices");
const { GetUser, SetUser } = require("../Auth/Auth");
const { Hassan } = require("../Model/Model");
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const Result = await Hassan.findOne({ email, password });
    if (Result && Result.role=='Admin'){
      const token = SetUser(Result);
      const oneMonth = 30 * 24 * 60 * 60 * 1000;
      res.cookie("token", token, { maxAge: oneMonth }).render("Home",{role:"Admin",message:''});
    }
    else if (Result && Result.role=='Not-admin'){
      const token = SetUser(Result);
      const oneMonth = 30 * 24 * 60 * 60 * 1000;
      res.cookie("token", token, { maxAge: oneMonth }).render("Home",{role:"Not-admin"});
    }
     else {
      res.render("LoginForm", {
        errorMessage: "Check your Email and Password and Try Again",
      });
    }
  } catch (error) {
    res.render("LoginForm", {
      errorMessage: "An unexpected error occurred. Please try again later.",
    });
  }
});
router.get("/", (req, res) => {
  res.render("LoginForm", { errorMessage: "Plz Login For Paid Course" }); // Ensure 'Nav.ejs' exists in the 'views' folder
});
module.exports = router;
