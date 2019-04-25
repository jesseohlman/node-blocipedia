const express = require("express");
const router = express.Router();

const collaboratorController = require("../controllers/collaboratorController");



router.post("/wikis/:wikiId/collaborators/new", collaboratorController.create);
router.get("/wikis/:wikiId/collaborators", collaboratorController.showCollabs);

module.exports = router;