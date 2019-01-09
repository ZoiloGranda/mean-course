const express = require('express');

const app = express();

app.use('/api/posts',(req, res, next)=>{
  const posts =[
    {id: 'asdad132', title:'first post', content:'post content'},
    {id: 'fk28ehsd', title:'second post', content:'post content 2'}
  ]
  res.status(200).json({
    message:'Posts fetched correctly',
    posts:posts
  })
})

module.exports = app;