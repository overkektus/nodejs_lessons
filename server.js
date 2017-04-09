var express     = require('express'),
    bodyParser  = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID    = require('mongodb').ObjectID;

var db = require('./db');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

var artists = [
   {
      id: 1,
      name: 'Matallica'
   },
   {
      id: 2,
      name: 'Iron Maiden'
   },
   {
      id: 3,
      name: 'Deep Purple'
   }
];

app.get('/', function(req, res) {
   res.send('Hello API');
})

app.get('/artists', function(req, res) {
   db.get().collection('artists').find().toArray(function(err, docs) {
      if (err) {
         console.log(err);
         return res.sendStatus(500);
      }
      res.send(docs);
   })
   //res.send(artists);
})

app.get('/artists/:id', function (req, res) {
   db.get().collection('artists').findOne({ _id: ObjectID(req.params.id) }, function(err, doc) {
      if(err){
         console.log(err);
         return res.sendSatus(500);
      }
      res.send(doc);
   })
})

app.post('/artists', function (req, res) {
   var artist = {
      name: req.body.name
   };
   db.get().collection('artists').insert(artist, function(err, result){
      if (err) {
         console.log(err);
         return res.sendStatus(500);
      }
      res.send(artist);
   })
   //res.send(artist);
})

app.put('/artists/:id', function (req, res) {
   db.get().collection('artists').updateOne(
      { _id: ObjectID(req.params.id) },
      { name: req.body.name },
      function (err, result) {
         if(err) {
            console.log(err);
            return res.sendStatus(500);
         }
         res.sendStatus(200);
      }
   )
   /*
   var artist = artists.find(function (artist) {
      return artist.id === Number(req.params.id);
   });
   artist.name = req.body.name;
   res.sendStatus(200);
   */
})

app.delete('/artists/:id', function (req, res) {
   db.get().collection('artists').deleteOne(
      { _id: ObjectID(req.params.id) },
      function (err, result) {
         if (err) {
            console.log(err);
            return res.sendStatus(500);
         }
         res.sendStatus(200);
      }
   )
   /*
   artists = artists.filter(function (artist) {
      return artist.id !== Number(req.params.id);
   })
   res.sendStatus(200);
   */
})

db.connect('mongodb://localhost:27017/myapi', function (err){
   if (err) {
      return console.log(err);
   }
   app.listen(3012, function() {
      console.log('API app started');
   })
})