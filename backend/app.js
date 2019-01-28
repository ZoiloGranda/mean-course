const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post')

const app = express();

mongoose.connect('mongodb+srv://Zoilo:8EbEIeZlHRy4eWC7@cluster0-pfpox.mongodb.net/test?retryWrites=true')
.then(()=>{
  console.log('conneced to DB');
}).catch((err)=>{
  console.log('connection to DB failed');
  console.log(err);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin ,X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
next()  
})

app.post('/api/posts',(req, res, next)=>{
    const post = new Post({
      title:req.body.title,
      content:req.body.content
    });
    console.log(post);
    res.status(201).json({
      message: 'Post added successfully'
    })
})

app.get('/api/posts',(req, res, next)=>{
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