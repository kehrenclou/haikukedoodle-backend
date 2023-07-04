const router = require('express').Router();
const auth = require('../middlewares/auth');
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
} = require('../controllers/cards');

const {
  validateCardId,
  validateCardBody,
} = require('../validations/validation');

router.get('/', getCards);
router.get('/:cardSkip', loadMoreCards);

router.get('/:userId/bookmarks', auth, getBookmarks);
router.get('/:cardSkip/:userId/bookmarks',auth,  loadMoreBookmarks);

router.get('/:userId/cards', auth, getOwnerCards);
router.get('/:cardSkip/:userId/cards', auth, loadMoreOwnerCards);

router.post('/', auth,validateCardBody, createCard);
router.patch('/:cardId/owner', auth,validateCardId, updateCardOwner);

router.put('/:cardId/likes', auth,validateCardId, likeCard);
router.delete('/:cardId/likes',auth, validateCardId, dislikeCard);

router.put('/:cardId/bookmarks', auth, validateCardId, addBookmark);
router.delete('/:cardId/bookmarks', auth, validateCardId, removeBookmark);

router.delete('/:cardId/delete', auth, validateCardId, deleteCard);

module.exports = router;
