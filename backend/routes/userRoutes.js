const express = require('express');
const { registerUser, authUser, allUsers } = require('../controllers/userController');
const router = express.Router();
const {protect} = require("../middlewares/authMiddleware");

router.route("/").post(registerUser);
router.post('/login' , authUser);
router.route("/").get(protect , allUsers);
module.exports = router; 