const router = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
  addBookmark,
  removeBookmark,
} = require("../controllers/cards");

router.get("/", getCards);
router.post("/create", createCard);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", likeCard);
router.put("/:cardId/likes", dislikeCard);
router.put("/:cardId/bookmarks", addBookmark);
router.put("/:cardId/bookmarks", removeBookmark);

module.exports = router;
