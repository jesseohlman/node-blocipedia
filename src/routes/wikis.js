const express = require("express");
const router = express.Router();

const wikiController = require("../controllers/wikiController");

router.get("/wikis/:id", wikiController.show);
router.get("/wikis/new", function(){console.log("this doesn't log")}, wikiController.neww);
router.post("/wikis/create", wikiController.create);
router.get("/wikis", function(){console.log("this logs and loads forever")}, wikiController.index);



module.exports = router;