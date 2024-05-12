import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Data-Visualization';
  valueEmittedFromChildComponent: any;
  xparam:any;
  xcat:any;
  yparam:any;
  ycat:any;
  category: any='';
  parentEventHandlerFunction(valueEmitted: any){
  console.log(valueEmitted)
    this.valueEmittedFromChildComponent = valueEmitted.param;
    this.category= valueEmitted.category;

    if(this.category=='both'){
      this.xcat=valueEmitted.xcat
      this.ycat=valueEmitted.ycat
      this.xparam=valueEmitted.xparam
      this.yparam=valueEmitted.yparam

    }
   
  }
}
