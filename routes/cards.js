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

const {
  validateCardBody,
  validateCardId,
} = require("../validations/validation");

router.get("/", getCards);

router.post("/", createCard);

router.delete("/:cardId", validateCardId, deleteCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);
router.put("/:cardId/bookmarks", addBookmark);
router.delete("/:cardId/bookmarks", removeBookmark);

module.exports = router;
//can divide into 2 routes an authorized route and an unauthorized