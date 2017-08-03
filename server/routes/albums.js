const express = require("express");
const router = express.Router();
const Album = require('../models/Album');

router.get('/albums', (req, res) => {
  Album.find()
  .then(data => {
    res.render('albums', { albums: data })
  })
})

router.get("/edit/:id", (req, res) => {
  Album.findOne({ _id: req.params.id })
  .then((data) => {
    console.log(data)
    res.render("edit", data)
  })
})

router.post('/edit/:id', (req, res) => {
  console.log(req.body)
  Album.findByIdAndUpdate(req.params.id, { $set: req.body })
  .then((data) =>
    res.redirect("/albums"))
});

router.post('/delete', (req, res) => {
  console.log('deleting', req.body)
  Album.remove({ _id: req.body._id }, function(err){
    if(!err){
      console.log("success")
      res.redirect("/albums")
    } else {
      console.log("error")
    }
  })
})

module.exports = router;
