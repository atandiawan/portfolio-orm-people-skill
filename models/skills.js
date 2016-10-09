let mongoose = require('mongoose')

let Schema = mongoose.Schema

let skillsSchema = new Schema({
  name: String,
  description: String,
})

let Skills = mongoose.model('skills', skillsSchema)
module.exports = Skills
