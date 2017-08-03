require('./server/index');
const Album = require('./server/models/Album');

let newAlbum = { title: 'writings on the wall',
  artist: 'destinys child',
  year: '2015',
  genre: ['pop, indie, rock']
};

new Album(newAlbum)
.save()
.then((result)=>{
  console.log(result);
})
.catch((err)=>{
  console.log(err)
})
