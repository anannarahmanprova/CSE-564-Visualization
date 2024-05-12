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
  selector: 'app-d3-bar',
  templateUrl: './d3-bar.component.html',
  styleUrls: ['./d3-bar.component.scss']
})
export class D3BarComponent implements OnInit {
  public d3 = d3;
  @Input() inputFromParent: any;
  @Output() changeindexvalue = new EventEmitter<string>();
  @Output() changepcavalue = new EventEmitter<any>();


  private highestValue: string | undefined;
  private svg:any;
  private margin:any={
    x:120,
    y:70,
  }
  // private width = 750 - this.margin.x*2 ;
  // private height = 380 - this.margin.y*2 ;
  private width = 850 - this.margin.x*2 ;
  private height = 580 - this.margin.y*2 ;
  param: any;
  index:any=5;
  pca:any={x:1,y:2,change:'x'}
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
    
  




    const x = this.d3
      .scaleLinear()
      .range([0, this.width])
      .domain([0,this.inputFromParent.col.length])


   
    this.svg
      .append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(this.d3.axisBottom(x))
      .selectAll("text")
    
      .style('text-anchor', 'end')
      .style("font-size", "12px")
      .style("cursor", "pointer")
      .on('click', (event:any, d:any) => {
        this.changepca(d)


      this.svg.selectAll("rect")
      .style("stroke", "none")
      .style("stroke-width", "0");

      this.svg.selectAll(`.bar-${this.pca.x}`) 
      .style("stroke", "#000") 
      .style("stroke-width", "2"); 


      this.svg.selectAll(`.bar-${this.pca.y}`) 
      .style("stroke", "#000") 
      .style("stroke-width", "2"); 


      });
      
     


 

    const y = this.d3
      .scaleLinear()
      .domain([0, 1])
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
        .attr( "class", (d:any) => `bar-${d.name}`)
        .attr("x", (d:any) => x(d.name)-10)
        .attr("y",(d:any) => y(d.value))
        .attr("width", 20)
        .attr("height", (d:any) =>
          y(d.value) < this.height ? this.height - y(d.value) : 0
        )
        .style("cursor", "pointer")
        .attr("stroke", "black") 
        .attr("stroke-width",  (d:any )=> (d.name==this.pca.x || d.name==this.pca.y)?2:0)
        .attr("fill", (d:any )=> d.name!=this.index?'lightblue':'blue')
        .on('click', (event:any, d:any) => {
          this.svg.selectAll('rect').classed('selected', false).attr('fill', 'lightblue');
        
      
          d3.select(event.target).classed('selected', true).attr('fill', '#00008B');

          this.changeundex(d)
        });
       


    this.svg.append("text")
        .attr("x", this.width / 2) 
        .attr("y", -25)
        .attr("text-anchor", "middle")
        .attr("font-size", "18px")
        .style("font-weight", "bold") 
        .text("Scree Plot");


    this.svg.append("text")
    .attr("fill", "#000")
    .attr("transform", `translate(${this.width / 2},${this.height +50})`) 
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")  
    .text("PCA");
    
    
    this.svg.append("text")
        .attr("fill", "#000") 
        .attr("transform", "rotate(-90)") 
        .attr("y", 0 - this.margin.x+50)
        .attr("x", 0 - (this.height / 2))
        .attr("dy", "1em") 
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")  
        .text("Eigenvalue");

         const line = d3.line<any>()
       .x((d: any) => x(d.name))
       .y((d: any) => y(d.value2));
  
   
      this.svg.append("path")
      .data([data])
      .attr("class", "line3")
      .style("stroke", '#5D3FD3')
      .style("fill", "None")
      .style("stroke-width", "2px")
      .attr("d",line)



      this.svg.selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d: any) => x(d['name']))
      .attr("cy",  (d: any) => y(d['value2']))
      .attr("r", 3)
      .style("opacity", 1)
      .style("fill", (d: any) =>"#5D3FD3");
        

   





        











    


  }

  ngOnChanges(changes: SimpleChanges): void{
   
    this.data=[]
   
    this.inputFromParent.evalue.forEach((s:any,index:any) => {
      this.data.push({'name':(index+1), 'value':s, 'value2':this.inputFromParent.ratio[index]})
  });
 
 
 
  const svg = d3.select("div#chart_bar");

 
  svg.selectAll("*").remove();
  
  this.createSvg()
  this.initial()
  this.drawBars(this.data)

  }


   

   
  @HostListener('unloaded')
  ngOnDestroy() {
      console.log('Cleared');
      const svg = d3.select("div#chart_bar"); 

      svg.selectAll("*").remove();
  }

  changeundex(val:any){

  
    this.changeindexvalue.emit(val);
    this.index=val.name


  }
  changepca(val:any){
  
    if(val!= this.pca.x && val!=this.pca.y ){
      if(this.pca.change=='x'){
        this.pca.x=val
        this.pca.change='y'
      }
      else{
        this.pca.y=val
        this.pca.change='x'
      }
    }
    // console.log(this.pca)
    this.changepcavalue.emit({x:this.pca.x-1,y:this.pca.y-1});

  }

  
  
  

  



}
