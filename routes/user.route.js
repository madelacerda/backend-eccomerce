const router = require("express").Router();
const { signup, findAll, login } = require("../controllers/user.controller");

router.post("/", signup);
router.get("/", findAll);
router.post("/login", login);
module.exports = router;
