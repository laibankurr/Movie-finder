const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

router.post("/favoriteNumber", (req, res) => {
  Favorite.find({ movieId: req.body.movieId }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, favoriteNumber: result.length });
  });
});

router.post("/beFavorite", (req, res) => {
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, data) => {
    if (err) return res.status(400).send(err);

    let result = false;
    if (data.length !== 0) {
      result = true;
    }

    res.status(200).json({ success: true, beFavorite: result });
  });
});

router.post("/removeFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, data });
  });
});

router.post("/addFavorite", (req, res) => {
  const favorite = new Favorite(req.body);

  favorite.save((err, data) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.post("/getFavoriteMovie", (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, favorites });
  });
});

/* router.post("/deleteFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, data });
  });
}); */

module.exports = router;
