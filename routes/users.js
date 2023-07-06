const router = require("express").Router();

const { sendUserProfile, increaseCount } = require("../controllers/users");

router.get("/me", sendUserProfile);
router.patch("/:userId/counter", increaseCount);

module.exports = router;
