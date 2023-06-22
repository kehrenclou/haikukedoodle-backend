const Card = require("../models/card");

const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");
const ForbiddenError = require("../errors/forbidden");

//check and see if created status needs to be added here

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next); //equivalent to .catch(err=>next(err));
};

const getBookmarks = (req, res, next) => {
  const { userId } = req.params;

  Card.find({ bookmarks: userId })
    .then((cards) => res.send(cards))
    .catch(next);
};

const getOwnerCards = (req, res, next) => {
  const { userId } = req.params;
  Card.find({ owner: userId })
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { aiId, created, choices, usage, subject, owner, terms } = req.body;

  Card.create({ aiId, created, choices, usage, subject, owner, terms })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Data not valid"));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => new NotFoundError("No card found with that Id"))

    .then((card) => {
      if (req.user._id.toString() === card.owner.toString()) {
        Card.findByIdAndDelete(cardId)
          .orFail(() => new BadRequestError("Cannot Delete"))
          .then((card) => res.send(card))
          .catch(next);
      } else {
        throw new ForbiddenError("You do not have rights to delete card");
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.body;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail(() => new NotFoundError("No card found with that Id"))
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.body;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail(() => new NotFoundError("No card found with that Id"))

    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

const addBookmark = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.body;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { bookmarks: userId } },
    { new: true }
  )
    .orFail(() => new NotFoundError("No card found with that Id"))
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

const removeBookmark = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.body;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { bookmarks: userId } },
    { new: true }
  )
    .orFail(() => new NotFoundError("No card found with that Id"))

    .then((card) => {
      res.send(card);
    })
    .catch(next);
};
module.exports = {
  getCards,
  getBookmarks,
  getOwnerCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
  addBookmark,
  removeBookmark,
};
