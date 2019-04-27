const express = require("express");
const router = express.Router();

const collaboratorController = require("../controllers/collaboratorController");



router.post("/wikis/:wikiId/collaborators/new", collaboratorController.create);
router.get("/wikis/:wikiId/collaborators", collaboratorController.showCollabs);
router.post("/wikis/:wikiId/collaborators/destroy", collaboratorController.destroy);


module.exports = router;