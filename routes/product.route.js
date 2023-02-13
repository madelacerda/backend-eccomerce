const express = require("express");
const router = express.Router();
const {
  findAll,
  save,
  del,
  update,
  findOndByid,
} = require("../controllers/product.controller");

router.get("/", findAll);
router.post("/", save);
router.put("/:id", update);
router.delete("/:id", del);
router.get("/id/:_id", findOndByid);

module.exports = router;
