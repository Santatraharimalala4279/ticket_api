const express = require("express");
const router = express.Router();
const responseController = require("../controller/ResponseController");
const multer = require("../middleware/file.config");

router.post(
  "/user/:userId/ticket/:ticketId",
  multer,
  responseController.replyTickets
);
router.get("/", responseController.retrieveResponse);

module.exports = router;
