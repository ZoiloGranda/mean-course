import { Injectable } from '@angular/core';
import { Post } from './post.model'
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[]=[]
  getPosts(){
    //using spread operator and array[] to return a the posts as a new array instead of a reference to this.posts
    return [...this.posts]
  }
  
  addPost(title:string, content:string){
    const post:Post={title:tile,content:content};
    this.posts.push(post);
  }
  
  constructor() { }
}
