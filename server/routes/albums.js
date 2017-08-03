const express = require("express");
const router = express.Router();
const Album = require('../models/Album');

router.get('/albums', (req, res) => {
  Album.find()
  .then(data => {
    res.render('albums', { albums: data })
  })
})

router.put('/albums', (req, res) => {

  Album.findByIdAndUpdate({ _id }, { $set: req.body }, function(err) {
    if (!err){
      console.log('edited')
      res.send('edited')
    } else {
      console.log('error')
    }
  })
})

router.post('/albums', (req, res) => {
  console.log('deleting', req.body)
  Album.remove({ _id: req.body._id }, function(err){
    if(!err){
      console.log("success")
      res.send("deleted")
    } else {
      console.log("error")
    }
  })
})

module.exports = router;
