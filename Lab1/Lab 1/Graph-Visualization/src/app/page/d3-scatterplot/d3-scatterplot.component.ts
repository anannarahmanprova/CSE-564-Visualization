import {

  Component,
  HostListener,
  Input,
  OnInit,
  SimpleChanges,

} from "@angular/core";
import * as d3 from 'd3';
import { DataServiceService } from "src/app/data-service.service";

@Component({
  selector: 'app-d3-scatterplot',
  templateUrl: './d3-scatterplot.component.html',
  styleUrls: ['./d3-scatterplot.component.scss']
})
export class D3ScatterplotComponent implements OnInit {

  public d3 = d3;



  private svg:any;
  private margin:any={
    x:120,
    y:70,
  }
  private width = 750 - this.margin.x*2 ;
  private height = 380 - this.margin.y*2 ;
  constructor(private ds: DataServiceService) {
   
  }
  @Input() xparam: any;
  @Input() yparam: any;
  @Input() xcat: any;
  @Input() ycat: any;
  xaxis:any;
  yaxis:any;
  cat:any;
  map:any;
  mapy:any;

  data:any;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
   
  }

  private createSvg(): void {
    this.svg = this.d3
      .select("div#chart")
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${this.width + this.margin.x * 2} ${this.height + this.margin.y * 2}`
      )

      .append("g")
      .attr("transform", "translate(" + this.margin.x + "," + this.margin.y + ")");
  }

  private drawPlot(data: any[]): void {



    let xmax= d3.max(data, (d) => { return +d['xbar'] })||0
    let xmin= d3.min(data, (d) => { return +d['xbar'] })||0
    const xPadding = (xmax - xmin) * 0.05; // 5% padding on each side

    const x = d3.scaleLinear()
    .domain([xmin-xPadding,xmax+xPadding])
    .range([ 0, this.width ]);

    console.log(this.map,this.data)
    const xprime = d3.axisBottom(x).ticks(this.map.size-1)
    .tickFormat(d => [...this.map].find(([key, value]) =>d === value)[0] || d);

    this.svg.append("g").attr("transform", "translate(0," + this.height + ")")
    .call(this.xcat=='categoric'?xprime:this.d3.axisBottom(x))
    .selectAll("text")
    .attr('transform', 'translate(-10, 0)rotate(-45)')
      .style('text-anchor', 'end')
      .style("font-size", "6px");
    
    ;



    let ymax= d3.max(data, (d) => { return +d['ybar'] })||0
    let ymin= d3.min(data, (d) => { return +d['ybar'] })||0


   
    const yPadding = (ymax - ymin) * 0.05; // 5% padding on each side
   
    const y = d3.scaleLinear()
    .domain([ymin-yPadding,ymax+yPadding])
    .range([this.height,0]);


    const yprime = d3.axisLeft(y).ticks(this.mapy.size-1)
    .tickFormat(d => [...this.mapy].find(([key, value]) =>d === value)[0]|| d);
   

    this.svg.append("g")
    .call(this.ycat=='categoric'?yprime:this.d3.axisLeft(y))
    .selectAll("text")
   
      .style('text-anchor', 'end')
      .style("font-size", "6px");
    
    ;

   
    const dots = this.svg.append('g');
    dots.selectAll("dot")
    .data(this.data)
    .enter()
    .append("circle")
    .attr("cx", (d: any) => x(d['xbar']))
    .attr("cy",  (d: any) => y(d['ybar']))
    .attr("r", this.ycat=='categoric' && this.xcat=='categoric'?4:1)
    .style("opacity", 1)
    .style("fill", "#5A515B");


    dots.selectAll("text")
    .data(this.data)
    .enter()
    .append("text")
    .text( (d: any) => d.Framework)
    .attr("x", (d: any) => x(d['xbar']))
    .attr("y", (d: any)  => y(d['ybar']))



    this.svg.append("text")
    .attr("x", this.width / 2) 
    .attr("y", -25)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px") 
    .text("Scatterplot: "+this.xparam+"-"+this.yparam);





   this.svg.append("text")
    .attr("fill", "#000")
    .attr("transform", `translate(${this.width / 2},${this.height +50})`) 
    .attr("text-anchor", "middle")
    .attr("font-size", "11px")  
    .text(this.xparam);


this.svg.append("text")
    .attr("fill", "#000") 
    .attr("transform", "rotate(-90)") 
    .attr("y", 0 - this.margin.x+50)
    .attr("x", 0 - (this.height / 2))
    .attr("dy", "1em") 
    .attr("text-anchor", "middle")
    .attr("font-size", "11px")  
    .text(this.yparam);






}


ngOnChanges(changes: SimpleChanges): void{
  console.log("get")
  this.data= this.ds.getData();
  this.map= new Map()
  this.mapy= new Map()

  
  


    let bit=1;

    let bity=1;
    this.data.forEach((d:any,index:any)=>{

        if(this.xcat=="categoric"){
          if (this.map.has(d[this.xparam])){
            this.data[index]['xbar']=this.map.get(d[this.xparam])
          }
          else{
          
            this.map.set(d[this.xparam],bit)
            this.data[index]['xbar']=this.map.get(d[this.xparam])
            bit++
          }
      } else if(this.xcat=="numeric"){
        this.data[index]['xbar']=d[this.xparam]

      }
      if(this.ycat=="categoric"){
        if (this.mapy.has(d[this.yparam])){
          this.data[index]['ybar']=this.mapy.get(d[this.yparam])
        }
        else{
          this.mapy.set(d[this.yparam],bity)
          this.data[index]['ybar']=this.mapy.get(d[this.yparam])
          bity++
        }
      }
      else if(this.ycat=="numeric"){
        this.data[index]['ybar']=d[this.yparam]

      }
    })

   
  
  
  


   
   

    const svg = d3.select("div#chart"); 

    svg.selectAll("*").remove();
    this.createSvg()

    this.drawPlot(this.data)



  
 }


 @HostListener('unloaded')
ngOnDestroy() {
    console.log('Cleared');
    const svg = d3.select("div#chart"); 

    svg.selectAll("*").remove();
}

}
