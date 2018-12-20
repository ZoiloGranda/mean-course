import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[]=[];
  private postsUpdated = new Subject<Post[]>()
  getPosts(){
    //using spread operator and array[] to return a the posts as a new array instead of a reference to this.posts
    return [...this.posts]
  }
  
  getPostsUpdateListener(){
    return this.postsUpdated.asObservable()
  }
  
  addPost(title:string, content:string){
    const post:Post={title:title,content:content};
    this.posts.push(post);
    //after the new post is pushed to the array of post, we emit next() which sends a message to 
    // all the subscribers (observers), and send all the posts
    this.postsUpdated.next([...this.posts])
  }
  
  constructor() { }
}
