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

const {} = require("../validations/validation");

router.get("/", getCards);
router.get("/:userId/bookmarks", auth, getBookmarks);
router.get("/:userId/cards", auth, getOwnerCards);

router.post("/", createCard);
router.patch("/:cardId/owner", updateCardOwner);

router.delete("/:cardId/delete", auth, deleteCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);
router.put("/:cardId/bookmarks", addBookmark);
router.delete("/:cardId/bookmarks", removeBookmark);

module.exports = router;
