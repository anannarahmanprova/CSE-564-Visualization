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
  selector: 'app-d3-kmse',
  templateUrl: './d3-kmse.component.html',
  styleUrls: ['./d3-kmse.component.scss']
})
export class D3KmseComponent implements OnInit {
  public d3 = d3;
  @Input() inputFromParent: any;

  @Output() changekvalue = new EventEmitter<string>();


  private highestValue: string | undefined;
  private svg:any;
  private margin:any={
    x:120,
    y:70,
  }
  private width = 950 - this.margin.x*2 ;
  private height = 680 - this.margin.y*2 ;
  param: any;
  k:any=3;
  constructor(private ds: DataServiceService,) {
   
  }
  isToggled: boolean = false;

  public data:any=[]

  ngOnInit(): void {
   

   
  }
  

  ngAfterViewInit(): void {
 
  }

  private initial(){
    let highestCurrentValue = 0;
    let tableLength = this.data.length;
    this.data.forEach((data:any, i:any) => {
      const barValue = Number(data.value);
      if (barValue > highestCurrentValue) {
        highestCurrentValue = barValue;
      }
      if (tableLength == i + 1) {
        this.highestValue = highestCurrentValue.toString();
      }
    });

  }

  private createSvg(): void {
   
   
    this.svg = this.d3
      .select("div#chart_kmse")
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${this.width + this.margin.x * 2} ${this.height + this.margin.y * 2}`
      )

      .append("g")
      .attr("transform", "translate(" + this.margin.x + "," + this.margin.y + ")");
      console.log(this.svg)
  }

  private drawBars(data: any[]): void {
    
  

    const colorScale = d3.scaleOrdinal()
    .domain(data.map(d => d.name))
    .range(["#CDB1CE"]); 
   
  



    const x = this.d3
    .scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.name))
    .padding(0.2);

 
  this.svg
    .append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(this.d3.axisBottom(x))
    .selectAll("text")
    .attr('transform', 'translate(-10, 0)rotate(-45)')
    .style('text-anchor', 'end')
    .style("font-size", "12px");




  const y = this.d3
    .scaleLinear()
    .domain([0, Number(this.highestValue)+.01])
    .range([this.height, 0]);



  this.svg.selectAll(".grid-line")
    .data(y.ticks(y.ticks().length))
    .enter()
    .append("line")
    .attr("class", "grid-line")
    .attr("x1", 0)
    .attr("x2", this.width)
    .attr("y1", (d:any) => y(d))
    .attr("y2", (d:any) => y(d))
    .style("stroke", "#ddd") 
    .style("stroke-width", "1px") 
    .style("shape-rendering", "crispEdges"); 

  this.svg
      .append("g")
      .call(this.d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "12px");


  this.svg
      .selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d:any) => x(d.name))
      .attr("y",(d:any) => y(d.value))
      .style("cursor", "pointer")
      .attr("width", x.bandwidth())
      .attr("height", (d:any) =>
        y(d.value) < this.height ? this.height - y(d.value) : this.height
      ) 
      .attr("fill", (d:any )=> this.k!=d.name?'#CDB1CE':'purple')
      .on('click', (event:any, d:any) => {
        this.svg.selectAll('rect').classed('selected', false).attr('fill', '#CDB1CE');
      
     
        d3.select(event.target).classed('selected', true).attr('fill', 'purple');
        this.changek(d)
      });
      
      
      
      
      
      ;


  this.svg.append("text")
      .attr("x", this.width / 2) 
      .attr("y", -25)
      .attr("text-anchor", "middle")
      .attr("font-size", "22px") 
      .style("font-weight", "bold") 
      .text("Kmeans MSE");


  this.svg.append("text")
  .attr("fill", "#000")
  .attr("transform", `translate(${this.width / 2},${this.height +50})`) 
  .attr("text-anchor", "middle")
  .attr("font-size", "16px")  
  .text("K");
  
  
  this.svg.append("text")
      .attr("fill", "#000") 
      .attr("transform", "rotate(-90)") 
      .attr("y", 0 - this.margin.x+50)
      .attr("x", 0 - (this.height / 2))
      .attr("dy", "1em") 
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")  
      .text("MSE");




        











    


  }

  ngOnChanges(changes: SimpleChanges): void{
   
    this.data=[]
   
    this.inputFromParent.kmeans.forEach((s:any,index:any) => {
      this.data.push({'name':s.k, 'value':s.MSE})
  });
 
 
 
  const svg = d3.select("div#chart_kmse");

 
  svg.selectAll("*").remove();
  
  this.createSvg()
  this.initial()
  this.drawBars(this.data)
 
  }


   

   
  @HostListener('unloaded')
  ngOnDestroy() {
      console.log('Cleared');
      const svg = d3.select("div#chart_kmse"); 

      svg.selectAll("*").remove();
  }

  changek(val:any){


    this.changekvalue.emit(val);
    this.k= val.name

  }
  

}
