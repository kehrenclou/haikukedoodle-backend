const router = require("express").Router();

const {
  sendUserProfile,
  increaseCount,
  resetCount,
} = require("../controllers/users");

router.get("/me", sendUserProfile);
router.patch("/:userId/counter", increaseCount);
router.patch("/:userId/reset", resetCount);

module.exports = router;
