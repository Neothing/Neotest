const test = require("../controllers/test.controller");
const router = require("express").Router();

router.get("/", test.findAll);
router.get("/:id", test.findOne);
router.post("/", test.create);
router.put("/:id", test.update);
router.delete("/:id", test.delete);

module.exports = router;
