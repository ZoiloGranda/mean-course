import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post} from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title:'First Post', content:'This is the first post content'},
  //   {title:'Second Post', content:'This is the second post content'},
  //   {title:'Third Post', content:'This is the third post content'},
  // ]
  posts:Post[] =[];
  private postsSub : Subscription;
  constructor(public postsService:PostsService) {
   }

  ngOnInit() {
    this.postsService.getPosts()
    //the first parameter that subscribe receives, is the the callback function when a new
    // event is emited
    this.postsSub = this.postsService.getPostsUpdateListener().subscribe((posts:Post[])=>{
      this.posts = posts;
    })
  }
  
  onDelete(postId:string){
    this.postsService.deletePost(postId);
  }
  
  ngOnDestroy(){
    this.postsSub.unsubscribe()
  }

}
