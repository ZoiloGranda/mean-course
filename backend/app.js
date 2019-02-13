const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post')

const app = express();

mongoose.connect('mongodb+srv://Zoilo:8EbEIeZlHRy4eWC7@cluster0-pfpox.mongodb.net/node-angular?retryWrites=true')
.then(()=>{
  console.log('connected to DB');
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
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    })
  })
})

app.get('/api/posts',(req, res, next)=>{
  Post.find().then(documents =>{
    console.log(documents);
    res.status(200).json({
      message:'Posts fetched correctly',
      posts:documents
    })
  })
  .catch(err=>{
    console.log(err);
  })
})

app.delete('/api/posts/:id',(req, res, next)=>{
  console.log(req.params);
  Post.deleteOne({_id:req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({message:'post deleted'})
  }).catch(err=>{
    console.log('error deleting post from db');
    console.log(err);
  })
})

module.exports = app;