import { Component, HostBinding, Input, HostListener, ElementRef, OnInit, EventEmitter, Output } from '@angular/core';
// import { HttpClientModule } from "@angular/common/http";
 import { HttpClient } from '@angular/common/http';
 import { DataServiceService } from '../../data-service.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    host: {
        'class': 'c-sidebar c-sidebar-light'
    },
    templateUrl: './sidebar.component.html'
})
// tslint:disable: curly variable-name
export class SidebarComponent implements OnInit {

    @HostBinding('class.c-sidebar-show') _alwaysShow = false;
    @HostBinding('class.c-sidebar-lg-show') _show = true;
    private _enableClickOutside = false;
    @Input()
    @HostBinding('class.c-sidebar-fixed') fixed = true;
    @Output() buttonClicked = new EventEmitter<any>();
    //public dataArray: model[] = [];
    public dataArray:any=[];
     public numeric:any=[ 'Age',"Period (Months)","Credit Limit",
      'Revolving Balance','Open to Buy Credit Line','Change in Trans. Amount','Transaction Amount','Transaction Count','Change in Trans. Count'
  ,'Card Utilization Ratio'

 ];
//     public categoric: any=['Nationality','Club','Skill Moves','Work Rate','Position']
    
//     public both:any=['subscribers', 'videoviews','uploads','category','Youtuber',
// ]


    public header:any=[
    {name:'Age',value:'numeric'}, 
    { name:'Gender',value:'categoric'},
    {name:'Education',value:'categoric'},
    {name:'Dependent',value:'categoric'},
    {name:'Income',value:'categoric'},
    {name:'Period (Months)',value:'numeric'},
     
    { name:'No. of Products',value:'categoric'},
    {name:'Credit Limit',value:'numeric'},
    {name:'Revolving Balance',value:'numeric'},
    {name:'Open to Buy Credit Line',value:'numeric'},
    {name:'Change in Trans. Amount',value:'numeric'}, 
    { name:'Transaction Amount',value:'numeric'},
    {name:'Transaction Count',value:'numeric'},
    {name:'Change in Trans. Count',value:'numeric'},
    {name:'Card Utilization Ratio',value:'numeric'}



]


    


    x:any=[]; 
    y:any=[];
    xcategory: any;
    ycategory: any;
    constructor(private eRef: ElementRef, private http:HttpClient,private ds:DataServiceService,private router: Router) { }
    ngOnInit(): void {
        
       
           this.http.get('assets/processed.csv', {responseType: 'text'})
          .subscribe(
              data => {
                  let csvToRowArray = data.split("\n");
                  for (let index = 1; index < csvToRowArray.length - 1; index++) {
                    let row = csvToRowArray[index].split(",");
                 
                    // this.dataArray.push(new model(row[1], parseInt(row[2]), parseInt(row[3]), row[4], parseInt(row[6])));
                    this.dataArray.push({
                    "Age": parseInt(row[0]), 
                    "Gender": row[1], 
                    'Dependent':row[2],
                     'Education':row[3],
                    'Income': row[4], 
                    'Period (Months)': row[5], 
             
                    'Airport Code': row[5], 

                    "No. of Products":row[6], 
                    'Credit Limit': row[7],
                    'Revolving Balance': row[8], 
                    
                    'Open to Buy Credit Line': row[9],
                    'Change in Trans. Amount': row[10], 

                    'Transaction Amount': row[11],
                    'Transaction Count': row[12], 
                    'Change in Trans. Count':row[13], 
                    'Card Utilization Ratio': row[14]
                
                
                
                
                
                
                
                
                
                
                
                
                
                });
                  }
                  this.ds.addData(this.dataArray)
                  //console.log(this.dataArray);
              },
              error => {
                  console.log(error);
              }
          );
        
    }

    toggle(): void {
        const smalScreen = window && window.innerWidth <= 992;
        if (smalScreen) {
            if (this._alwaysShow) {
                this._alwaysShow = false;
                this._show = false;
            } else {
                this._show = true;
                this._alwaysShow = true;
                this._enableClickOutside = false;
                setTimeout(() => this._enableClickOutside = true, 150);
            }
        } else {
            if (this._show || this._alwaysShow) {
                this._alwaysShow = false;
                this._show = false;
            } else {
                this._show = true;
            }
        }
    }

    @HostListener('document:click', ['$event'])
    clickout(event: any) {
        if (this._alwaysShow && this._enableClickOutside) {
            if (this.eRef.nativeElement.contains(event.target)) {
                // clicked inside
            } else {
                // clicked outside
                this._alwaysShow = false;
            }
        }
    }
    change(param:any,category:any){

        this.x=[];
        this.y=[];
        this.xcategory=null;
        this.ycategory=null
      
       
       this.buttonClicked.emit({'param':param, 'category':category});
    }

    checkradio(axis:any,index:any){

        if(axis=='x'){
            if(this.x[index]==1){
                return true
            }
            else 
            return false
        }
        else{
            if(this.y[index]==1){
                return true
            }
            else 
            return false
        }

    }
    addradio(axis:any,index:any){
        if(axis=='x'){
            this.x=[]
           this.x[index]=1
           this.y[index]=0
           this.xcategory=this.header[index].name
           if(this.ycategory==this.header[index].name){
            this.ycategory=null

           }
        }
        else{
            this.y=[]
            this.y[index]=1
            this.x[index]=0
            this.ycategory=this.header[index].name
            if(this.xcategory==this.header[index].name){
                this.xcategory=null
    
               }
        
        }

        this.checkscatter();

     
    }

    checkscatter(){
        console.log(this.xcategory, this.ycategory)

        if(this.xcategory!= null && this.ycategory!=null){
            this.buttonClicked.emit({'xparam':this.xcategory, 
            'yparam':this.ycategory,
            'xcat':this.numeric.indexOf(this.xcategory) != -1?"numeric":"categoric",
            'ycat':this.numeric.indexOf(this.ycategory) != -1?"numeric":"categoric",
            
            'category':'both'});

        }
      
       
        
     }
 
}

// export class model{
//     Youtuber: String;
//     subscribers: number;
//     videoviews: number;
//     category:String;
//     uploads:number
  
//     constructor(Youtuber: String, subscribers: number, videoviews: number, category:String, uploads:number){
//       this.Youtuber = Youtuber;
//       this.subscribers = subscribers;
//       this.videoviews = videoviews;
//       this. category =  category;
//       this.uploads = uploads;
//     }
//   }
