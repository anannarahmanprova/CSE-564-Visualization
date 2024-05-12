import {

  Component,
  HostListener,
  Input,
  OnInit,
  SimpleChanges,

} from "@angular/core";
import * as d3 from 'd3';
import { DataServiceService } from '../../data-service.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-d3-histogram',
  templateUrl: './d3-histogram.component.html',
  styleUrls: ['./d3-histogram.component.scss']
})
export class D3HistogramComponent implements OnInit {
  public d3 = d3;
  @Input() inputFromParent: any;


  private svg:any;
  private margin:any={
    x:120,
    y:70,
  }
  private width = 750 - this.margin.x*2 ;
  private height = 380 - this.margin.y*2 ;
  constructor(private ds: DataServiceService,private route: ActivatedRoute) {
  
  }
  isToggled: boolean = false;

  public data:any
  param:any;


  ngOnInit(): void {
   
    
  
   
   
  }

  ngAfterViewInit(): void {

     
  }

  private createSvg(): void {
    this.svg = this.d3
      .select("div#chart_hist")
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${this.width + this.margin.x * 2} ${this.height + this.margin.y * 2}`
      )

      .append("g")
      .attr("transform", "translate(" + this.margin.x + "," + this.margin.y + ")");
  }

  private drawBars(data: any[]): void {

   


    let max= d3.max(data, (d) => { return +d[this.param] })||0
    let min= d3.min(data, (d) => { return +d[this.param] })||0


    const xPadding = (max - min) * 0.05; // 5% padding on each side

   
    
    let x = d3.scaleLinear()
    .domain([min, max])     
    .range([0, this.width]);

    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x).ticks(10))
    .selectAll("text")
    .attr('transform', 'translate(-10, 0)rotate(-45)')
    .style('text-anchor', 'end')
    .style("font-size", "6px");

    let  y = d3.scaleLinear()
    .range([this.height, 0]);

 

    let dom : number[] = x.domain();
    var histogram = d3.bin()
        .value((d:any) => { return d[this.param]; })   
        .domain([ dom[0], dom[1] ])  
        .thresholds(x.ticks(10)); 

  
    var bins = histogram(data);
    console.log(bins)

    y.domain([0, d3.max(bins, function(d:any) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
    this.svg.append("g")
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y));



  
    this.svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect") 
        .merge(this.svg.selectAll("rect")
        .data(bins)) 
        .transition() 
        .duration(1000)
          .attr("x", 0)
          .attr("transform", function(d:any) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
          .attr("width", function(d:any) { return x(d.x1) - x(d.x0) -1 ; })
          .attr("height", (d:any) => { return this.height - y(d.length); })
          .style("fill", "#887689")



    this.svg.selectAll("rect").data(bins)
        .exit()
        .remove()



      this.svg.append("text")
      .attr("x", this.width / 2) 
      .attr("y", -25)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px") 
      .text("Histogram: "+this.param);


      this.svg.append("text")
      .attr("fill", "#000")
      .attr("transform", `translate(${this.width / 2},${this.height +50})`) 
      .attr("text-anchor", "middle")
      .attr("font-size", "11px")  
      .text("Value");
    
    
    this.svg.append("text")
        .attr("fill", "#000") 
        .attr("transform", "rotate(-90)") 
        .attr("y", 0 - this.margin.x+50)
        .attr("x", 0 - (this.height / 2))
        .attr("dy", "1em") 
        .attr("text-anchor", "middle")
        .attr("font-size", "11px")  
        .text("Count");
    





   }


   ngOnChanges(changes: SimpleChanges): void{
    this.isToggled = false;
    this.param=this.inputFromParent
 
    this.data= this.ds.getData();
    // this.param="price"

    // this.data=[{price:10},{price:20},{price:22},{price:30},{price:40},{price:50}]


    const svg = d3.select("div#chart_hist"); 

    svg.selectAll("*").remove();
    this.createSvg()
    this.drawBars(this.data)
   }
   toggle(){
    this.isToggled=!this.isToggled
    
    const svg = d3.select("div#chart_hist"); 
    svg.selectAll("*").remove();
    this.createSvg()
   
    if(this.isToggled){

        this.horizontal(this.data);

      

    }
    else{

      this.drawBars(this.data)

    }

   }
 horizontal(data: any[]): void {

  let max= d3.max(data, (d) => { return +d[this.param] })||0
  let min= d3.min(data, (d) => { return +d[this.param] })||0
     
  let y = d3.scaleLinear().
  domain([min, max]).
  range([this.height, 0]);;


  this.svg.append("g")
  .call(d3.axisLeft(y).ticks(10));


  let x = d3.scaleLinear()
  .range([0, this.width]);


  let dom : number[] = y.domain();
  let histogram = d3.bin()
      .value((d:any) => { return d[this.param]; })   
      .domain([ dom[0], dom[1] ])  
      .thresholds(y.ticks(10)); 

 
  let bins = histogram(data);
  x.domain([0, d3.max(bins, function(d:any) { return d.length; })]);

  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr('transform', 'translate(-10, 0)rotate(-45)')
  .style('text-anchor', 'end')
  .style("font-size", "6px");





  this.svg.selectAll("rect").data(bins)
  .enter()
  .append("rect") 
  .merge(this.svg.selectAll("rect").data(bins)) 
  .transition() 
  .duration(1000)
    .attr("y", 0)
    .attr("transform", function(d:any) { return "translate(" +0+ "," + y(d.x1)  + ")"; })
    .attr("width",    (d:any) => { return x(d.length); })
    .attr("height",function(d:any) { return y(d.x0)-y(d.x1)-1 ; })
    .style("fill", "#887689")




  this.svg.selectAll("rect").data(bins).exit().remove()
  this.svg.append("text")
  .attr("x", this.width / 2) 
  .attr("y", -25)
  .attr("text-anchor", "middle")
  .attr("font-size", "16px") 
  .text("Histogram: "+this.param);
  this.svg.append("text")
  .attr("fill", "#000")
  .attr("transform", `translate(${this.width / 2},${this.height +50})`) 
  .attr("text-anchor", "middle")
  .attr("font-size", "11px")  
  .text("Count");


this.svg.append("text")
  .attr("fill", "#000") 
  .attr("transform", "rotate(-90)") 
  .attr("y", 0 - this.margin.x+50)
  .attr("x", 0 - (this.height / 2))
  .attr("dy", "1em") 
  .attr("text-anchor", "middle")
  .attr("font-size", "11px")  
  .text("Value");





 }
        
  

 @HostListener('unloaded')
 ngOnDestroy() {
     console.log('Cleared');
     const svg = d3.select("div#chart_hist"); 

     svg.selectAll("*").remove();
 }
 

  





}
