const express = require("express");
const router = express.Router();
const Album = require('../models/Album');

router.get("/", (req, res) => {
  res.render("index", { secondsToRender: Date.now() - req._startTime });
});

router.post('/add', (req, res) => {
  let newAlbum = new Album(req.body);
  newAlbum.save(function(err) {
    if (err) console.log("ERROR")
  })
  res.redirect('/albums');
})


module.exports = router;
