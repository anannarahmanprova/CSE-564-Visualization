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
  selector: 'app-num-pcp',
  templateUrl: './num-pcp.component.html',
  styleUrls: ['./num-pcp.component.scss']
})
export class NumPcpComponent implements OnInit {

  public d3 = d3;
  pairs:any=[]
  @Input() k: any;



  private svg:any;
  private margin:any={
    x:120,
    y:70,
  }
  private width = 950 - this.margin.x*2 ;
  private height = 480 - this.margin.y*2 ;
  constructor(private ds: DataServiceService) {
   
  }
  @Input() response: any;
  @Input() new_label: any;


  xaxis:any;
  yaxis:any;
  cat:any;
  map:any;
  mapy:any;

  data:any;
  label:any;
  cluster:any;
 

  ngOnInit(): void {
   

  }

  ngAfterViewInit(): void {
   
  }

  private createSvg(): void {
    this.svg = this.d3
      .select("div#chart_pcp_num")
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${this.width + this.margin.x * 2} ${this.height + this.margin.y * 2}`
      )

      .append("g")
      .attr("transform", "translate(" + this.margin.x + "," + this.margin.y + ")");
  }



private drawPlot(data: any[], labels:any[], cluster:any[]): void {


  let color=['#FF0000','#00FFFF','#0000FF','#FBC02D','#FFFF00',
     '#00FF00','#1976D2', '#388E3C', '#FBC02D', '#8E24AA','#7FFFD4']

    let x = d3.scalePoint().range([0, this.width]).padding(-.80).domain(labels);

    let y:any = {};
    for (const dim of labels) {
      let maxValue = d3.max(data, function (d:any) { return Number(d[dim]); })||0;
      let minValue = d3.min(data, function (d:any) { return Number(d[dim]); })||0;

      y[dim] = d3.scaleLinear()
          .domain([minValue, maxValue]) // --> Same axis range for each group
          // --> different axis range for each group --> .domain( [d3.extent(data, function(d) { return +d[name]; })] )
          .range([this.height, 0])
    }



    
    this.svg.selectAll(".data-path")
    .data(data)
    .enter().append("path")
    .attr("class", "data-path")
    .attr("d", function(d:any) {
      // Map each dimension to a point, filtering out undefined values and ensuring number types
      const points = labels.map(p => {
        const xValue = x(p);
        const yValue = y[p](d[p]);
        return [xValue, yValue] as [number, number];
      }).filter(point => point[0] !== undefined && point[1] !== undefined);
    
    
      return d3.line()([...points]);
    })
    .style("fill", "none")
    .style("stroke",  function (d:any, i:any) { 
      return color[cluster[i]];
  })
    .style("stroke-opacity", 0.2)
    .on("mouseover", (event:any, d:any) => {

      this.svg.selectAll(".data-path").style("stroke-opacity", 0);
 
      const targetIndex = cluster[data.indexOf(d)]; 
      d3.selectAll(this.svg.selectAll(".data-path").nodes().filter((d:any, i:any) => cluster[i] === targetIndex))
          .style("stroke-opacity", 0.7); 
  })
  .on("mouseout", () => {
      
      this.svg.selectAll(".data-path").style("stroke-opacity", 0.2);
  });
    




  labels.forEach((dim) => {
    this.svg.append("g")
       .attr("class", "axis")
  
       .attr("transform", `translate(${x(dim)},0)`)
       .call(d3.axisLeft(y[dim]))
       .style("stroke-width", "3px");
         
       

       
  });

  const sliderColors = ['#e6194B', '#3cb44b', 'black', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4', '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9'];
labels.forEach((dim,index) => {
  const currentColor = sliderColors[index % sliderColors.length];;
  this.svg.append("text")
    .attr("class", "axis-label")
    .attr("transform", `translate(${x(dim)},${this.height + 20})`) 
    .style("text-anchor", "middle")
    .text(dim)
    .style("font-size", "11px")
    .style("fill",currentColor)
    
   
});

this.svg.append("text")
    .attr("x", this.width / 2) 
    .attr("y", -25)
    .attr("text-anchor", "middle")
    .attr("font-size", "22px")
    .style("font-weight", "bold")  
    .text("Numeric Parallel Coordinates");






let filterExtents:any = {};
labels.forEach(dim => {
  const domainRange = y[dim].domain();
  const highestValue = domainRange[domainRange.length - 1]; // Get the highest value from the domain
  filterExtents[dim] = highestValue; // Store it as both the lower and upper bounds
});



labels.forEach((dim,index) => {
  // Slider container, positioned under the axis
  const sliderSvg = d3.select("#chart_pcp_num").append("svg")
      .attr("class", "slider-svg")
      .attr("width", 59) // Fixed width for the slider
      .attr("height", 50) // Height for the slider container
    
      .style("left", `${x(dim)}px`) // Position based on the axis scale
      .style("top", `${this.height + 60}px`); // Position below the parallel coordinates plot

      

  const currentColor = sliderColors[index % sliderColors.length];
  sliderSvg.append("line")
      .attr("x1", 0)
      .attr("y1", 25) // Center vertically in the slider container
      .attr("x2", 50) // Match the slider container width
      .attr("y2", 25) // Center vertically in the slider container
      .style("stroke", "#000")
      .style("stroke-width", "2")
      .style("stroke", currentColor);

  // Slider handle
  const handle = sliderSvg.append("circle")
      .attr("class", "slider-handle")
      .attr("cx", 46) // Start in the middle of the slider
      .attr("cy", 25) // Center vertically in the slider container
      .attr("r", 4)
      .style("fill",  currentColor);

  // Drag behavior for the slider handle
  // Drag behavior for the slider handle
const drag = d3.drag<SVGCircleElement, any, any>()
.on("drag", (event) => {
  
    // Correct the constraints for x
    const newX = Math.max(4, Math.min(46, event.x)); // Constrain x within the slider line width
    d3.select(event.sourceEvent.target).attr("cx", newX);

    const domainRange = y[dim].range();
    const domainValue = y[dim].invert((newX - 4) / (46 - 4) * (domainRange[1] - domainRange[0]) + domainRange[0]);
  

    filterExtents[dim] =  domainValue;
  
    this.svg.selectAll(".data-path")
    .style("stroke-opacity", (d:any) => {
      return labels.every(dim => {
        // Check if data point is within extents for this dimension
        const extent = filterExtents[dim];
        const value = d[dim];

        // console.log(dim, extent,value)
        return  value <= extent;
      }) ? 0.7 : 0; // Only show paths that meet all dimension filter criteria
    });
});


// Apply the drag behavior
handle.call(drag);
});


  
  

    


}



ngOnChanges(changes: SimpleChanges): void{





 


    this.data=[]
     this.label= this.new_label?this.new_label:this.response.numeric_col;
     this.cluster=this.response.kmeans[this.k]['cluster_labels'];
     this.response.dataset.forEach((e:any,i:any) => {
       this.data.push({

        'Age':e[0],
        'Dependent':e[1], 
        'Months':e[2], 
        'Product':e[3], 
        'Limit':e[4], 
        'Balance':e[5], 
        'Open to buy':e[6], 
        'Amt change':e[7], 
        'Trans. Amt':e[8],
        'Trans. Count':e[9], 
        'Count Change':e[10],
        'Utilization':e[11]







        })
      
      });

     


     
   

     const svg = d3.select("div#chart_pcp_num"); 
     svg.selectAll("*").remove();
     this.createSvg()

     this.drawPlot(this.data,this.label,this.cluster)





  
 }





 @HostListener('unloaded')
ngOnDestroy() {
    console.log('Cleared');
    const svg = d3.select("div#chart_pcp_num"); 

    svg.selectAll("*").remove();
}

}
