import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }
  param: any;
  data:any;
  addData(data:any){
    this.data=data
   
  }
  getData(){
    return this.data
  }
  addParam(param:any){
    this.param=param
  }
  getParam(){
    return this.param
  }
}
