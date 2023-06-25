const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getCards,
  loadMoreCards,
  getBookmarks,
  loadMoreBookmarks,
  getOwnerCards,
  loadMoreOwnerCards,
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
router.get("/:cardSkip", loadMoreCards);

router.get("/:userId/bookmarks", auth, getBookmarks);
router.get("/:cardSkip/:userId/bookmarks", auth, loadMoreBookmarks);

router.get("/:userId/cards", auth, getOwnerCards);
router.get("/:cardSkip/:userId/cards",auth, loadMoreOwnerCards )

router.post("/", createCard);
router.patch("/:cardId/owner", updateCardOwner);

router.delete("/:cardId/delete", auth, deleteCard);
router.put("/:cardId/likes", validateCardId, likeCard);
router.delete("/:cardId/likes", validateCardId, dislikeCard);
router.put("/:cardId/bookmarks", validateCardId, addBookmark);
router.delete("/:cardId/bookmarks", validateCardId, removeBookmark);

module.exports = router;
