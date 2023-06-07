const router = require("express").Router();

const { sendUserProfile } = require("../controllers/users");

router.get("/me", sendUserProfile);

module.exports = router;
