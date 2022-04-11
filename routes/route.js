const pubRoute = require("../controllers/functions")

const express = require('express');
const router = express.Router();

router.post("/message", pubRoute.sendMessage)
router.post("/listen", pubRoute.listenner)


module.exports = router