import {

  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  SimpleChanges,

} from "@angular/core";
import * as d3 from 'd3';
import { DataServiceService } from "src/app/data-service.service";

@Component({
  selector: 'app-mds-variable',
  templateUrl: './mds-variable.component.html',
  styleUrls: ['./mds-variable.component.scss']
})
export class MdsVariableComponent implements OnInit {

  public d3 = d3;
  pairs:any=[]



  private svg:any;
  private margin:any={
    x:120,
    y:70,
  }
  private width = 750 - this.margin.x*2 ;
  private height = 480 - this.margin.y*2 ;
  constructor(private ds: DataServiceService) {
   
  }
  @Input() response: any;
  @Input() k: any;


  xaxis:any;
  yaxis:any;
  cat:any;

  mapy:any;

  data:any;
  label:any;
  count:any=0;
  state:any;
  @Output() changevalue = new EventEmitter<any>();
 

  ngOnInit(): void {
   

  }

  ngAfterViewInit(): void {
   
  }

  private createSvg(): void {
    this.svg = this.d3
      .select("div#mdchart")
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${this.width + this.margin.x * 2} ${this.height + this.margin.y * 2}`
      )

      .append("g")
      .attr("transform", "translate(" + this.margin.x + "," + this.margin.y + ")");
  }

  private drawPlot(data: any[], label:any[]): void {

     let color=['#FF0000','#00FFFF','#0000FF','#FBC02D','#FFFF00',
     '#00FF00','#1976D2', '#388E3C', '#FBC02D', '#8E24AA','#7FFFD4']

     let visited:any;





    let xmax= d3.max(data, (d) => { return Number(d[0]); })||0
    let xmin= d3.min(data, (d) => { return Number(d[0]); })||0
    let xpadding = (xmax - xmin) * 0.05;
  


    let xScale = d3.scaleLinear().range([0, this.width]);
    

    xScale.domain([xmin-xpadding,xmax+xpadding])
   


  


    this.svg.append("g").attr("transform", "translate(0," + this.height + ")")
    .call(this.d3.axisBottom(xScale))
    .selectAll("text")
    .attr('transform', 'translate(-10, 0)rotate(-45)')
      .style('text-anchor', 'end')
      .style("font-size", "12px");
    
    ;



    let ymax= d3.max(data, (d) => { return Number(d[1]); })||0
    let ymin= d3.min(data, (d) => { return Number(d[1]); })||0
    let ypadding = (ymax - ymin) * 0.05;




    let yScale = d3.scaleLinear().range([this.height, 0]);
    yScale.domain([ymin-ypadding,ymax+ypadding]);
   



 
   

    this.svg.append("g")
    .call(this.d3.axisLeft(yScale))
    .selectAll("text")
   
      .style('text-anchor', 'end')
      .style("font-size", "12px");

      let map= new Map();
    
      this.svg.
      selectAll(".circle")
      .data(data) // Assuming 'data' is an array of points
      .enter().append("circle")
        .attr("class", "circle") // Make sure to set the class for selection
        .attr("r", 5)
        .attr("cx", function(d:any) { return xScale(d[0]); })
        .attr("cy", function(d:any) { return yScale(d[1]); })
        .style("fill", '#388E3C') // Default color
        .on('click', (event:any, d:any) => {


        

       
 
          if(this.count>0 && this.count<label.length && !map.has(data.indexOf(d))){

            this.svg.append('defs').append('marker')
    .attr('id', 'arrowhead') // The ID is used to reference this marker
    .attr('markerWidth', 10)
    .attr('markerHeight', 7)
    .attr('refX', 7) // Position of the reference point on the marker (for positioning the arrow tip on the line end)
    .attr('refY', 3.5) // Center the marker on the line path
    .attr('orient', 'auto') // Allow the marker to orient itself according to the line's path direction
  .append('path')
    .attr('d', 'M 0,0 V 7 L10,3.5 Z') // A path that draws a simple arrow
    .attr('fill', 'black');
          
         
              this.svg.append("line")
                .attr("class", "line-to-center")
                .attr("x1",this.state.x)
                .attr("y1", this.state.y)
                .attr("x2", xScale(d[0]))
                .attr("y2", yScale(d[1]))
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("marker-end", "url(#arrowhead)");;
            



            
            map.set(data.indexOf(d),this.count)
            this.count++;
            d3.select(event.currentTarget).style("fill", '#FF0000');
            this.state={x:xScale(d[0]),y:yScale(d[1])
            }


            if(this.count==label.length){
              this.reorder(map)
            }


           






           




          }
          else if(this.count==0 || this.count>=label.length){
           
            this.count=0
            if (map) map.clear()
            this.svg.selectAll(".circle").style("fill", '#388E3C');
            this.svg.selectAll(".line-to-center").remove();

            map.set(data.indexOf(d),this.count)
            this.count++;
            d3.select(event.currentTarget).style("fill", '#FF0000');
            this.state={x:xScale(d[0]),y:yScale(d[1])

            
            
         


 }



}
   

          
        });

       


        this.svg.selectAll(".text")
        .data(data)
        .enter().append("text")
        .attr("x", function (d:any) { return xScale(d[0]) + 7; })
        .attr("y", function (d:any) { return yScale(d[1]) + 7; }) 
        .text(function (d:any, i:any) { return label[i]; })
        
        .attr("font-size", "8px");

   
   

    this.svg.append("text")
    .attr("x", this.width / 2) 
    .attr("y", -25)
    .attr("text-anchor", "middle")
    .attr("font-size", "18px")
    .style("font-weight", "bold")  
    .text("MDS Variable Plot");





   this.svg.append("text")
    .attr("fill", "#000")
    .attr("transform", `translate(${this.width / 2},${this.height +50})`) 
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")  
    .text("Dimension 1");


this.svg.append("text")
    .attr("fill", "#000") 
    .attr("transform", "rotate(-90)") 
    .attr("y", 0 - this.margin.x+50)
    .attr("x", 0 - (this.height / 2))
    .attr("dy", "1em") 
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")  
    .text("Dimension 2");


   


  




 






}

reorder(map:any){
  let new_label:any=[]
  map.forEach((value:any, key:any) => {

    new_label[value]=this.label[key]

    
  });

  console.log(new_label)
  this.changevalue.emit(new_label);

}


ngOnChanges(changes: SimpleChanges): void{





 


     this.data=this.response.mds_var;
     this.label=this.response.numeric_col;
    //  this.response.mds_data.forEach((e:any,i:any) => {
    //   this.data.push({"pca1":e[this.pca.x],"pca2":e[this.pca.y], "color": this.response.kmeans[this.k]['cluster_labels'][i]})
      
    //  });

     


     
   

     const svg = d3.select("div#mdchart"); 
     svg.selectAll("*").remove();
     this.createSvg()

     this.drawPlot(this.data,this.label)





  
 }


 @HostListener('unloaded')
ngOnDestroy() {
    console.log('Cleared');
    const svg = d3.select("div#mdchart"); 

    svg.selectAll("*").remove();
}
}
