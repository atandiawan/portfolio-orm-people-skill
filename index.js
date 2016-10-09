let express = require('express')
let app = express()
let users = require('./models/users.js')
let skills = require('./models/skills.js')
let bodyParser = require('body-parser')

app.use(bodyParser())

app.get('/skills', function(req,res,next){
  skills.find({}, function(err,result){
    res.json(result)
  })
})

app.get('/users', function(req,res,next){
  users.find({}).populate('skills').exec(function(err, result){
    res.json(result)
  })
})

app.post('/createskills', function(req,res,next){
  new skills({name: req.body.name, description: req.body.description}).save(function(err){
    if(err){
      console.log(err)
    }
    res.send('berhasil')
  })
})

app.post('/createusers', function(req,res,next){
  skills.findOne({name: req.body.skillname}, function(err, result){
    if(err){
      console.log(err)
    }

    new users({name: req.body.name, skills:result._id}).save(function(err){
      if(err){
        console.log(err)
      }
      res.send('berhasil')
    })
  })
})

app.post('/tambahskills', function(req,res,next){
  skills.findOne({name: req.body.skillname}, function(err, result){
    users.update({name: req.body.name}, {$push: {skills: result._id}}, function(err2, result2){
      if(err2){
        console.log(err2)
      }

      res.send('berhasil')
    })
  })
})

app.listen(3000, function(){
  console.log('listening on 3000')
})
