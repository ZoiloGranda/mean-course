const express = require('express');

const app = express();

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin ,X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
next()  
})

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