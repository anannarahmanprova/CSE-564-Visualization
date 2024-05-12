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
  pairs:any=[]



  private svg:any;
  private margin:any={
    x:120,
    y:70,
  }
  private width = 950 - this.margin.x*2 ;
  private height = 680 - this.margin.y*2 ;
  constructor(private ds: DataServiceService) {
   
  }
  @Input() response: any;
  @Input() k: any;
  @Input() pca: any;

  xaxis:any;
  yaxis:any;
  cat:any;
  map:any;
  mapy:any;

  data:any;
 

  ngOnInit(): void {
    // this.data=[{pca1:.1, pca2:.2} ,{pca1:.5, pca2:.6},{pca1:.5, pca2:.2}]
  
   

    // const svg = d3.select("div#chart"); 

    // svg.selectAll("*").remove();
    // this.createSvg()

    // this.drawPlot(this.data)


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

     let color=['#FF0000','#00FFFF','#0000FF','#FBC02D','#FFFF00',
     '#00FF00','#1976D2', '#388E3C', '#FBC02D', '#8E24AA','#7FFFD4']
     let ver=[
      '#D32F2F', '#1976D2', '#388E3C', '#FBC02D', '#8E24AA', '#7FFFD4', '#0D47A1', 'black', 'white', 'pink'
     ]

     let colum=this.response.col





    let xmax= d3.max(data, (d) => { return +d['pca1'] })||0
    let xmin= d3.min(data, (d) => { return +d['pca1'] })||0
    const xPadding = (xmax - xmin) * 0.05; // 5% padding on each side

    const x = d3.scaleLinear()
    .domain([xmin-xPadding,xmax+xPadding])
    .range([ 0, this.width ]);

  


    this.svg.append("g").attr("transform", "translate(0," + this.height + ")")
    .call(this.d3.axisBottom(x))
    .selectAll("text")
    .attr('transform', 'translate(-10, 0)rotate(-45)')
      .style('text-anchor', 'end')
      .style("font-size", "12px");
    
    ;



    let ymax= d3.max(data, (d) => { return +d['pca2'] })||0
    let ymin= d3.min(data, (d) => { return +d['pca2'] })||0


   
    const yPadding = (ymax - ymin) * 0.05; // 5% padding on each side
   
    const y = d3.scaleLinear()
    .domain([ymin-yPadding,ymax+yPadding])
    .range([this.height,0]);


 
   

    this.svg.append("g")
    .call(this.d3.axisLeft(y))
    .selectAll("text")
   
      .style('text-anchor', 'end')
      .style("font-size", "12px");
    
    ;

   
    const dots = this.svg.append('g');
    dots.selectAll("dot")
    .data(this.data)
    .enter()
    .append("circle")
    .attr("cx", (d: any) => x(d['pca1']))
    .attr("cy",  (d: any) => y(d['pca2']))
    .attr("r", 1.5)
    .style("opacity", 1)
    .style("fill", (d: any) =>color[d['color']]);


    dots.selectAll("text")
    .data(this.data)
    .enter()
    .append("text")
    .text( (d: any) => d.Framework)
    .attr("x", (d: any) => x(d['pca1']))
    .attr("y", (d: any)  => y(d['pca2']))



    this.svg.append("text")
    .attr("x", this.width / 2) 
    .attr("y", -25)
    .attr("text-anchor", "middle")
    .attr("font-size", "22px")
    .style("font-weight", "bold")  
    .text("Biplot");





   this.svg.append("text")
    .attr("fill", "#000")
    .attr("transform", `translate(${this.width / 2},${this.height +50})`) 
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")  
    .text("PC "+(this.pca.x+1));


this.svg.append("text")
    .attr("fill", "#000") 
    .attr("transform", "rotate(-90)") 
    .attr("y", 0 - this.margin.x+50)
    .attr("x", 0 - (this.height / 2))
    .attr("dy", "1em") 
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")  
    .text("PC "+(this.pca.y+1));


    this.svg.append("defs").append("marker")
    .attr("id", "arrow") // The ID used to reference this marker
    .attr("viewBox", "0 -5 10 10") // Defines the coordinate system for the marker
    .attr("refX", 10) // Position of the marker relative to the shape it is attached to
    .attr("refY", 0)
    .attr("markerWidth", 6) // Marker size
    .attr("markerHeight", 6)
    .attr("orient", "auto") // Ensures the marker orientates itself with the line it's attached to
    .append("path")
    .attr("d", "M0,-5L10,0L0,5") // Path for the arrow shape
    .style("fill", "black");


    // this.svg.selectAll('.line')
    // .data(this.pairs)
    // .enter()
    // .append('line')
    // .style("stroke", "black")
    // .style("stroke-width", 1)
    // .attr("x1", function (d:any) { return x(0) })
    // .attr("y1", function (d:any) { return y(0) })
    // .attr("x2", function (d:any) { return x(d[0] * (xmax - xmin)/2)})
    // .attr("y2", function (d:any) { return y(d[1] * (ymax - ymin)/2)})
    // .attr('marker-end', 'url(#arrow)');
   
    // Now draw your lines with the scaled vectors
    this.svg.selectAll('.line')
      .data(this.pairs)
      .enter()
      .append('line')
      .style("stroke", (d:any,i:any) => ver[i])
      .style("stroke-width", 1.2)
      .attr("x1", x(0))
      .attr("y1", y(0))
      .attr("x2",(d:any) => x(d[0] * (xmax - xmin)/2))
      .attr("y2",(d:any) => y(d[1] * (ymax - ymin)/2))
      .attr('marker-end', 'url(#arrow)');



  //   this.svg.append("g").selectAll("text")
  // .data(this.pairs)
  // .enter()
  // .append("text")
  // .attr("x", (d:any)=> x((d[0] + 0.01) * (xmax - xmin) / 2))
  // .attr("y", (d:any) => y((d[1] + 0.01) * (ymax - ymin) / 2))
  // .attr("fill", "black")
  // .attr("font-size", "8px")
  // .attr("font-weight", "bolder")
  // .attr("text-anchor", (d:any) => d[0] >= 0 ? "start" : "end") // Adjust text-anchor based on direction
  // .attr("dx", (d:any) => d[0] >= 0 ? "14px" : "-14px") // Adjust horizontal offset based on direction
  // .attr("dy", (d:any) => d[1] >= 0 ? "20px" : "-20px") // Slight vertical offset to align text better with line
  // .text((d:any, i:any) => colum[i]);

  // this.svg.append("g").selectAll("text")
  // .data(this.pairs)
  // .enter()
  // .append("text")
  // .attr("x", (d:any) => x((d[0] + 0.01) * (xmax - xmin) / 2))
  // .attr("y", (d:any) => y((d[1] + 0.01) * (ymax - ymin) / 2))
  // .attr("fill", "black")
  // .attr("font-size", "8px")
  // .attr("font-weight", "bolder")
  // .text((d:any, i:any) => colum[i])
  // .attr("transform", function(d:any) {
  //   // Calculate the angle in degrees
  //   const angle = Math.atan2(y(d[1] * (ymax - ymin) / 2) - y(0), 
  //                            x(d[0] * (xmax - xmin) / 2) - x(0)) * (180 / Math.PI);
  //   // Get the position for the rotation
  //   const xPosition = x((d[0] + 0.01) * (xmax - xmin) / 2);
  //   const yPosition = y((d[1] + 0.01) * (ymax - ymin) / 2);
  //   // Return the rotation transformation
  //   return `rotate(${angle},${xPosition},${yPosition})`;
  // });

 






  // Legend positioning and size
  const legendPosition = { x: 700, y: 0 };
  const legendItemHeight = 10;
  const legendItemWidth = 15;

  // Create legend items
  const legend = this. svg.selectAll(".legend")
    .data(this.pairs)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", (d:any, i:any) => `translate(0, ${i * legendItemHeight})`);

  // Draw color swatches
  legend.append("rect")
    .attr("x", legendPosition.x)
    .attr("y", (d:any, i:any) => legendPosition.y + (i * legendItemHeight))
    .attr("width", legendItemWidth)
    .attr("height", legendItemHeight - 2) // Slight gap between items
    .style("fill", (d:any,i:any) => ver[i]);

  // Add text labels
  legend.append("text")
    .attr("x", legendPosition.x + legendItemWidth + 5)
    .attr("y", (d:any, i:any) => legendPosition.y + (i * legendItemHeight) + (legendItemHeight / 2))
    .attr("dy", ".35em") // Vertically center text
    .text((d:any,i:any) => colum[i]);






}


ngOnChanges(changes: SimpleChanges): void{





  //  this.data=[{pca1:.1, pca2:.2} ,{pca1:.5, pca2:.6},{pca1:.5, pca2:.2}]


     this.data=[];
     this.response.pca.forEach((e:any,i:any) => {
      this.data.push({"pca1":e[this.pca.x],"pca2":e[this.pca.y], "color": this.response.kmeans[this.k]['cluster_labels'][i]})
      
     });

     


     this.pairs=[]


     this.response.eigenvectors.forEach((d:any)=>{

      this.pairs.push([d[this.pca.x],d[this.pca.y]])

     })
  
   

     const svg = d3.select("div#chart"); 
     svg.selectAll("*").remove();
     this.createSvg()

     this.drawPlot(this.data)

     console.log(this.k)



  
 }


 @HostListener('unloaded')
ngOnDestroy() {
    console.log('Cleared');
    const svg = d3.select("div#chart"); 

    svg.selectAll("*").remove();
}

}
