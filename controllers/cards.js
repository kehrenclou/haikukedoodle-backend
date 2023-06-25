const Card = require("../models/card");

const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");
const ForbiddenError = require("../errors/forbidden");

const getCards = async (req, res, next) => {
  try {
    const response = await Card.find({}).limit(6).sort({ created: -1 }).exec();
    const cardCount = await Card.estimatedDocumentCount();
    res.send({ cards: response, cardCount: cardCount });
  } catch (err) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      next(err);
    }
  }
};

const loadMoreCards = (req, res, next) => {
  const { cardSkip } = req.params;
  Card.find({})
    .limit(6)
    .skip(cardSkip)
    .sort({ created: -1 })
    .exec()
    .then((cards) => res.send(cards))
    .catch(next);
};

const getBookmarks = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const bookmarks = await Card.find({ bookmarks: userId })
      .limit(6)
      .sort({ created: -1 })
      .exec();
    const cardCount = await Card.countDocuments({ bookmarks: { $in: userId } });
    res.send({ bookmarks: bookmarks, cardCount: cardCount });
  } catch (err) {
    if (err.response) {
      console.log(err.response.statues);
      console.log(err.response.data);
    } else {
      next(err);
    }
  }
};
const loadMoreBookmarks = (req, res, next) => {
  const { cardSkip, userId } = req.params;

  Card.find({ bookmarks: userId })
    .limit(6)
    .skip(cardSkip)
    .sort({ created: -1 })
    .exec()
    .then((cards) => res.send(cards))
    .catch(next);
};

const getOwnerCards = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const ownerCards = await Card.find({ owner: userId })
      .limit(6)
      .sort({ created: -1 })
      .exec();
    const cardCount = await Card.countDocuments({ owner: { $in: userId } });
    res.send({ ownerCards: ownerCards, cardCount: cardCount });
  } catch (err) {
    if (err.response) {
      console.log(err.response.statues);
      console.log(err.response.data);
    } else {
      next(err);
    }
  }
};
const loadMoreOwnerCards = (req, res, next) => {
  const { cardSkip, userId } = req.params;

  Card.find({ owner: userId })
    .limit(6)
    .skip(cardSkip)
    .sort({ created: -1 })
    .exec()
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
const updateCardOwner = (req, res, next) => {
  const { owner, author } = req.body;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { owner, author }, { new: true })
    .orFail(() => new NotFoundError("No card found with that Id'"))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid Card Id"));
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
};
