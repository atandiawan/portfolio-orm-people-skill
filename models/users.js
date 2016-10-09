let mongoose = require('mongoose')
mongoose.connect('localhost:27017/people-skills')

let Schema = mongoose.Schema

let usersSchema = new Schema({
  name: String,
  skills: [{
    type: Schema.Types.ObjectId,
    ref: "skills"
  }]
})


let Users = mongoose.model('users', usersSchema)
module.exports = Users
