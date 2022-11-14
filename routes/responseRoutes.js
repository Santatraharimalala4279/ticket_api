const express = require("express");
const router = express.Router();
const responseController = require("../controller/ResponseController");
const multer = require("../middleware/file.config");

router.post("/", multer, responseController.replyTickets);
router.get("/", responseController.retrieveResponse);

module.exports = router;
