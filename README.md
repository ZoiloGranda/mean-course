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
By adding the `[]` to and HTML element attribute, the value of tha attibute gets binded to the value of the returning function or variable. Here the `value` and `placeholder` attibutes are binded to the component
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
