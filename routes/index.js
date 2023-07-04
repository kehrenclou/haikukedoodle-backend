const router = require("express").Router();
const auth = require("../middlewares/auth");

const cards = require("./cards");
const users = require("./users");
const NotFoundError = require("../errors/not-found");

router.use("/cards", cards);
router.use("/users", auth, users);

router.use((req, res, next) => {
  next(new NotFoundError("This route does not exist"));
});

module.exports = router;
