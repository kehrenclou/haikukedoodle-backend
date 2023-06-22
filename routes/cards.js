const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getCards,
  getBookmarks,
  getOwnerCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
  addBookmark,
  removeBookmark,
} = require("../controllers/cards");

const {} = require("../validations/validation");

router.get("/", getCards);
router.get("/:userId/bookmarks", getBookmarks);
router.get("/:userId/cards", getOwnerCards);

router.post("/", createCard);

router.delete("/:cardId/delete", auth, deleteCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);
router.put("/:cardId/bookmarks", addBookmark);
router.delete("/:cardId/bookmarks", removeBookmark);

module.exports = router;
