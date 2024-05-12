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
  selector: 'app-d3-bar',
  templateUrl: './d3-bar.component.html',
  styleUrls: ['./d3-bar.component.scss']
})
export class D3BarComponent implements OnInit {
  public d3 = d3;
  @Input() inputFromParent: any;


  private highestValue: string | undefined;
  private svg:any;
  private margin:any={
    x:120,
    y:70,
  }
  private width = 750 - this.margin.x*2 ;
  private height = 380 - this.margin.y*2 ;
  param: any;
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
      .select("div#chart_bar")
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
    .range(["#9C27A0", "#CDB1CE", "#563857"]); 

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
      .style("font-size", "6px");


 

    const y = this.d3
      .scaleLinear()
      .domain([0, Number(this.highestValue) + 50])
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
        .style("font-size", "6px");

  
    this.svg
        .selectAll("bars")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d:any) => x(d.name))
        .attr("y",(d:any) => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", (d:any) =>
          y(d.value) < this.height ? this.height - y(d.value) : this.height
        ) 
        .attr("fill", (d:any )=> colorScale(d.name));


    this.svg.append("text")
        .attr("x", this.width / 2) 
        .attr("y", -25)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px") 
        .text("Barchart: "+this.param);


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
    let map= new Map();
    this.data= this.ds.getData();
    this.ds.getData().forEach((d:any)=>{
     let val= d[this.param]
     if(map.has(val)){
      map.set(val,map.get(val)+1)
     }else{
      map.set(val,1)
     }


      
    })
    this.data=[]
    map.forEach((value: number, key: string) => {
      this.data.push({'name':key, 'value':value})
  });
 
 
 
  const svg = d3.select("div#chart_bar");

 
  svg.selectAll("*").remove();
  console.log(svg)
  this.createSvg()
  this.initial()
  this.drawBars(this.data)
   }


   toggle(){
    
    this.isToggled=!this.isToggled
    
    const svg = d3.select("div#chart_bar"); 
    svg.selectAll("*").remove();
    this.createSvg()
    this.initial()
    if(this.isToggled){

        this.horizontal(this.data);

      

    }
    else{

      this.drawBars(this.data)

    }

   }

   horizontal(data:any){

    const colorScale = d3.scaleOrdinal()
    .domain(data.map((d:any) => d.name))
    .range(["#9C27A0", "#CDB1CE", "#563857"]); 

    const y = this.d3
    .scaleBand()
    .range([0, this.height]) 
    .domain(data.map((d:any) => d.name))
    .padding(0.2);

    
    this.svg
      .append("g")

      .call(this.d3.axisLeft(y))
      
      .selectAll("text")
      .style("font-size", "6px");


    const x = this.d3
      .scaleLinear()
      .domain([0, Number(this.highestValue) + 50])
      .range([0, this.width]); 

    this.svg.selectAll(".grid-line")
    .data(x.ticks(x.ticks().length))
    .enter()
    .append("line")
    .attr("class", "grid-line")
    .attr("x1", (d:any) => x(d))
    .attr("x2", (d:any) => x(d))
    .attr("y1", 0)
    .attr("y2", this.height)
    .style("stroke", "#ddd") 
    .style("stroke-width", "1px") 
    .style("shape-rendering", "crispEdges"); 

    this.svg
    .append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(this.d3.axisBottom(x))
    .selectAll("text")
    .attr('transform', 'translate(-10, 0)rotate(-45)')
    .style('text-anchor', 'end')
    .style("font-size", "6px");






    this.svg
      .selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", (d: any) => y(d.name)) 
      .attr("x", 0) 
      .attr("height", y.bandwidth()) 
      .attr("width", (d: any) => x(d.value)) 
      .attr("fill", (d: any) => colorScale(d.name)); 


      this.svg.append("text")
      .attr("x", this.width / 2) 
      .attr("y", -25)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px") 
      .text("Barchart: "+this.param);



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
      const svg = d3.select("div#chart_bar"); 

      svg.selectAll("*").remove();
  }
  

  



}
