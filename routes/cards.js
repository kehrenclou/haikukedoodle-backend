const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getCards,
  getBookmarks,
  getOwnerCards,
  createCard,
  updateCardOwner,
  deleteCard,
  likeCard,
  dislikeCard,
  addBookmark,
  removeBookmark,
} = require("../controllers/cards");

const { validateCardId } = require("../validations/validation");

router.get("/", getCards);
router.get("/:userId/bookmarks", auth, getBookmarks);
router.get("/:userId/cards", auth, getOwnerCards);

router.post("/", createCard);
router.patch("/:cardId/owner", updateCardOwner);

router.delete("/:cardId/delete", auth, deleteCard);
router.put("/:cardId/likes", validateCardId, likeCard);
router.delete("/:cardId/likes", validateCardId, dislikeCard);
router.put("/:cardId/bookmarks", validateCardId, addBookmark);
router.delete("/:cardId/bookmarks", validateCardId, removeBookmark);

module.exports = router;
