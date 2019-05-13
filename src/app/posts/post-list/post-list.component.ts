import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent} from '@angular/material';
import { Subscription } from 'rxjs';
import { Post} from '../post.model';
import { PostsService } from '../posts.service';

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
  isLoading = false;
  totalPosts = 10;
  postsPerPage = 2;
  pageSizeOptions = [1,2,5,10];
  private postsSub : Subscription;
  constructor(public postsService:PostsService) {
   }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    //the first parameter that subscribe receives, is the the callback function when a new
    // event is emited
    this.postsSub = this.postsService.getPostsUpdateListener().subscribe((posts:Post[])=>{
      this.isLoading = false;
      this.posts = posts;
    })
  }
  
  onChangedPage(pageData: PageEvent){
    console.log('asdad')
  }
  
  onDelete(postId:string){
    this.postsService.deletePost(postId);
  }
  
  ngOnDestroy(){
    this.postsSub.unsubscribe()
  }

}
