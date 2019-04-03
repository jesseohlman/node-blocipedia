const express = require("express");
const router = express.Router();
const staticController = ("../controllers/staticController");

router.get('/', staticController.index);

module.exports = router;