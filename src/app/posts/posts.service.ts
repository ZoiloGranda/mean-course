import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Post } from './post.model';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[]=[];
  private postsUpdated = new Subject<Post[]>()
  constructor(private http: HttpClient) { }
  
  getPosts(){
    this.http.get<{message:string, posts:Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postData)=>{
      this.posts = postData.posts;
      //using spread operator and array[] to return a the posts as a new array instead of a reference to this.posts
      this.postsUpdated.next([...this.posts])
    });
  }
  
  getPostsUpdateListener(){
    return this.postsUpdated.asObservable()
  }
  
  addPost(title:string, content:string){
    const post:Post={id:null, title:title,content:content};
    this.posts.push(post);
    //after the new post is pushed to the array of post, we emit next() which sends a message to 
    // all the subscribers (observers), and send all the posts
    this.postsUpdated.next([...this.posts])
  }
  
}
