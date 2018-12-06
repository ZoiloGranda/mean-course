# MeanCourse

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

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