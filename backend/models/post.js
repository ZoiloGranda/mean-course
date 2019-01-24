const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title:{type:String, required:true},
  content:{type:String, required:true},
})

module.export = mongoose.model('Post', postSchema)