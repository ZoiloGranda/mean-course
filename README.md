# MeanCourse

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

## Starting the App

1. `npm install`
2. `ng serve` on one console to run the front end
3. `npm run start:server` on another console to run the backend
4. The DB is on MongoDB Atlas, you will probably need to go there, **Login->Security->IP Whitelist->Edit->Add current IP Address**.
5. On the browser go to http://localhost:4200

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Angular Notes
## App initialization
On `main.ts`, this is the line of code that starts the Angular app. First it creates a platform, and boostraps the main module (`AppModule`) of your app.
```typescript
platformBrowserDynamic().bootstrapModule(AppModule)
.catch(err => console.log(err));
```
On our main module (`AppModule`), we set the property `boostrap`, to the name of our main component (`AppComponent`)
```ts
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent] //the main root component, every other Component will be inside of this one
})
export class AppModule { }
```
## Component options
On every component we define their options with an object like this one, the `selector` is the name that is going to be used to add the component in a template, like an html tag (`<app-post-create></app-post-create>`)
```ts
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
```
## Property binding
By adding the `[]` to a HTML element attribute, the value of that attibute gets binded to the value of the selected function or variable. Here the `value` and `placeholder` attibutes are binded to the component
```html
<textarea rows="6" [value]="newPost" [placeholder]="fillText"></textarea>
```
```ts
export class PostCreateComponent implements OnInit {
  newPost ='NO CONTENT';
  fillText(){
    return 'Please write here'
  }
}
```
## Local reference / Reference variables
A Local reference is a reference to an HTML element in the template, and we pass it to a function on the component. In here, the Local reference is set to `#postInput`, which selects the `<textarea>` element and then passed to the click event `onAddPost(postInput)`, so that the component receives the HTML element.

```html
<!--Template-->
<textarea rows="6" [value]="newPost" #postInput></textarea>
<hr>
<button (click)="onAddPost(postInput)">Save Post</button>
<p>{{newPost }}</p>
```
```ts
//Controller
onAddPost(postInput:HTMLTextAreaElement){
this.newPost = postInput.value;
}
```

## Two way data binding
We can bind a value between the template and the controller using two data binding, by defining the `[(ngModel)]` directive on the template, and initializing the variable on the controller.
```html
<!--Template-->
<textarea rows="6" [(ngModel)]="enteredValue"></textarea>
```
```ts
//Controller
export class PostCreateComponent implements OnInit {
enteredValue =''; 
}
```

## ng add [package]
Adds the npm package for a published library to the project, and configures your default app project to use that library, eg : `ng add @angular/material`.

## Angular css selector :host
The :host pseudo-class selector, targets styles in the element that hosts the component, (the parent) as opposed to targeting elements inside the component's template.
```css
:host{ //host targets the parent component
  display: block;
  margin-top: 1rem;
}
```

## Event emitter
This is the flow to emit an Event, listen to it, and bind a variable value from the parent component to the children.
```ts
//On post-create.component.ts
//Importing the EventEmitter and the Output
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
// Defining the event name
@Output() postCreated = new EventEmitter();
//This function when clicked, will call the postCreated event and emit it with the new post data
onAddPost(){
const post = {
  title:this.enteredTitle,
  content:this.enteredContent
}
this.postCreated.emit(post)
}
```
```html
<!--On the parent component app.component.html 
we listen to the (postCreated) event, and when we receive the event, the function onPostAdded($event), is called
which adds the new post to the existing array of posts.
Then we bind the posts variable of app-post-list to the same value of storedPosts from app-post-create
-->
<main>
  <app-post-create (postCreated)="onPostAdded($event)"></app-post-create>
  <app-post-list [posts]="storedPosts"></app-post-list>
</main>
```
```ts
//On post-list.component.ts we import the Input dependency, and we bind the posts variable to the receiving value
//from the parent component
import { Component, OnInit, Input } from '@angular/core';

export class PostListComponent implements OnInit {
  @Input() posts =[];
}
```
## Observables and RxJS
First we make a get request, we specify the type of data we will receive `message:string, posts:any`. Then we call the `pipe` method to transform the stream of received data. The first `map` method is not the javascript method, is a method from the RxJS library. Then we call the native `map` method from javascript to modify the received data, in an `Object` that fits the `Post` model from the front end. Last the `subscribe` and `next` methods sends the `posts` data throught the Observable.
```ts
getPosts(){
  this.http.get<{message:string, posts:any}>('http://localhost:3000/api/posts')
  .pipe(map((postData)=>{
    return postData.posts.map(post=>{
      return {
        title: post.title,
        content: post.content,
        id: post._id
      }
    })
  }))
  .subscribe((transformedPosts)=>{
    this.posts = transformedPosts;
    //using spread operator and array[] to return a the posts as a new array instead of a reference to this.posts
    this.postsUpdated.next([...this.posts])
  });
}
```

## routerLink
This directive lets you link to specific routes in your app, that were defined in you app router module and load the corresponding component. The `routerLinkActive`, add the css class `"mat-accent"`, when the element is active
```html
<mat-toolbar color="primary">
  <span><a routerLink="/">MyMessages</a></span>
  <ul>
    <li>
      <a routerLink="/create" routerLinkActive="mat-accent">New Post</a>
    </li>
  </ul>
</mat-toolbar>
```

When the routerLink needs to create a dynamic url, it must be implemented like this `[routerLink]="['/edit',post.id]`. Each comma separated string is a segment of the url. In this case it will create a route to `/edit/post.id` (`post.id` is a current value on the html)

```html
<a mat-button color="primary" [routerLink]="['/edit',post.id]">EDIT</a>
```
## ActivatedRoute
Contains the information about a route associated with a component loaded in an outlet

```js
//we import the module
import { ActivatedRoute, ParamMap } from "@angular/router"

//on the constructor we define our route public variable, which is of type ActivatedRoute
constructor(public postsService: PostsService, public route: ActivatedRoute) {
}

ngOnInit() {
  //then we use it. The ActivatedRoute is an Observable, so we can susbcribe to it
  //paramMap contains the parameters of the route, in here we search for the postId param on the url
  this.route.paramMap.subscribe((paramMap: ParamMap)=>{
    if (paramMap.has('postId')){
      // ... code
    } else{
      // more code
    }
  })
}

```
# Mongo / Mongoose notes
## Connection 
The `node-angular` part is the database name, is created automatically the first time we add data.The Collection is also created automatically using the model name in plural.
```
mongoose.connect('mongodb+srv://User:Password@cluster0-pfpox.mongodb.net/node-angular?retryWrites=true')
```

## updateOne

```js
app.put('/api/posts/:id', (req, res, next)=>{
  const post = new Post({
    _id:req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id:req.params.id}, post).then(result=>{
    console.log(result);
    res.status(200).json({message:'updated successfully'})
  }).catch(error=>{
    console.log('error updating the post');
    console.log(error);
  })
})
```
