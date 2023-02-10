const express = require("express");
const router = express.Router();
const {
  findAll,
  save,
  del,
  update,
} = require("../controllers/product.controller");

router.get("/", findAll);
router.post("/", save);
router.put("/:id", update);
router.delete("/:name", del);

module.exports = router;
