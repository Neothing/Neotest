const rtube = require("../controllers/rtube.controller");
const router = require("express").Router();

router.get("/", rtube.index);
router.post("/", rtube.process);

module.exports = router;
