const router = require("express").Router();

//api 경로 분류
router.use("/user", require("./user"));
router.use("/post", require("./post"));

module.exports=router;