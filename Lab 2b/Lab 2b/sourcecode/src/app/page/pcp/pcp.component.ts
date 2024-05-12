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
  selector: 'app-pcp',
  templateUrl: './pcp.component.html',
  styleUrls: ['./pcp.component.scss']
})
export class PcpComponent implements OnInit {

  public d3 = d3;
  pairs:any=[]
  @Input() k: any;



  private svg:any;
  private margin:any={
    x:120,
    y:70,
  }
  private width = 850 - this.margin.x*2 ;
  private height = 400 - this.margin.y*2 ;
  constructor(private ds: DataServiceService) {
   
  }
  @Input() response: any;


  xaxis:any;
  yaxis:any;
  cat:any;
  map:any;
  mapy:any;

  data:any;
  label:any;
  cluster:any;
  swap:any

 

  ngOnInit(): void {
   

  }

  ngAfterViewInit(): void {
   
  }

  private createSvg(): void {
    this.svg = this.d3
      .select("div#chart_pcp")
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${this.width + this.margin.x * 2} ${this.height + this.margin.y * 2}`
      )

      .append("g")
      .attr("transform", "translate(" + this.margin.x + "," + this.margin.y + ")");
  }

//   private drawPlot(data: any[], labels:any[]): void {


//     let features = [
//       'Tempo',
//       'Energy',
//       'Danceability',
//       'Intensity',
//       'Live Likelihood',
//       'Positiveness',
//       'Duration',
//       'Acoustic',
//       'Popularity',
//       'Speech Focus'
//   ]
//   this.svg.append("text")
//       .attr("transform", "translate(100, 0)")
//       .attr("x", 400)
//       .attr("y", 50)
//       .attr("font-size", "24px")
//       .text("Parallel Coordinates Plot")
  
//   let g = this.svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");
  
 
  

//   let color:any = d3.scaleOrdinal()
//       .domain(["versicolor", "virginica"])
//       .range(["#21908dff", "#fde725ff"])


//   // For each dimension, I build a linear scale. I store all in a y object
//   let y:any = {}
//   for (const i in features) {
//       let name = features[i]
//       let max= d3.max(data, (d) => { return Number(d[name]); })||0
//       let min= d3.min(data, (d) => { return Number(d[name]); })||0

//       y[name] = d3.scaleLinear()
//           .domain([min, max]) // --> Same axis range for each group
//           // --> different axis range for each group --> .domain( [d3.extent(data, function(d) { return +d[name]; })] )
//           .range([this.height, 0])
//   }

//   // Build the X scale -> it find the best position for each Y axis
//   const x = d3.scalePoint()
//       .range([0, this.width])
//       .domain(features);

//   // Highlight the specie that is hovered
//   var highlight = function (idx:any) {

//       let label = labels[idx]

//       // first every group turns grey
//       d3.selectAll(".line")
//           .transition().duration(200)
//           .style("stroke", "lightgrey")
//           .style("opacity", "0.2")
          
//       // Second the hovered specie takes its color
//       d3.selectAll(".c" + label.toString())
//           .transition().duration(200)
//           .style("stroke", color[label])
//           .style("opacity", "1")
//   }

//   // Unhighlight
//   var doNotHighlight = function (idx:any) {
//       let label = labels[idx]
//       d3.selectAll(".line")
//           .transition().duration(200).delay(1000)
//           .style("stroke", color(label))
//           .style("opacity", "1")
//   }

//   // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
//   // function path(d:any) {
//   //     return d3.line()(features.map(function (p) { return [x(p), y[p](d[p])]; }));
//   // }

//   // Draw the lines
//   g
//       .selectAll("myPath")
//       .data(data)
//       .enter()
//       .append("path")
//       .attr("class", function (d:any, i:any) { return "line " +  "c" + labels[i]}) // 2 class for each line: 'line' and the group name
      
//       .style("fill", "none")
//       .style("stroke", function (d:any, i:any) { return (color(labels[i])) })
//       .style("opacity", 0.5)
//       // .on("mouseover", function (d, i) { highlight(i) })
//       // .on("mouseleave", function (d, i) { doNotHighlight(i) })

//   // Draw the axis:
//   g.selectAll("myAxis")
//       // For each dimension of the dataset I add a 'g' element:
//       .data(features).enter()
//       .append("g")
//       .attr("class", "axis")
//       // I translate this element to its right position on the x axis
//       .attr("transform", function (d:any) { return "translate(" + x(d) + ")"; })
//       // And I build the axis with the call function
    
//       // Add axis title
//       .append("text")
//       .style("text-anchor", "middle")
//       .style("font-size", 15)
//       .attr("y", "-10px")
//       .text(function (d:any) { return d; })
//       .style("fill", "black")





// }

private drawPlot(data: any[], labels:any[], cluster:any[]): void {


  let color=['#FF0000','#00FFFF','#0000FF','#FBC02D','#FFFF00',
     '#00FF00','#1976D2', '#388E3C', '#FBC02D', '#8E24AA','#7FFFD4']

    let x = d3.scalePoint().range([0, this.width]).padding(-1.3).domain(labels);

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
      // Append an axis group for each dimension and set up the axis
      const axisGroup = this.svg.append("g")
          .attr("class", "axis")
          .attr("transform", `translate(${x(dim)},0)`)
          .call(d3.axisLeft(y[dim]))
          .style("stroke-width", "3px");
  
      
      axisGroup.on('click', (event:any) => {
          if(this.swap==null){
          this.svg.selectAll('.axis line').attr('stroke', 'black');
          this.svg.selectAll('.axis path').attr('stroke', 'black');
  
        
        
          d3.select(event.currentTarget).selectAll('line').attr('stroke', 'yellow');
          d3.select(event.currentTarget).selectAll('path').attr('stroke', 'yellow');
          this.swap=dim
          }
          else{

            let newList = [...labels];
    
            // Then, find the indices of the items you want to swap
            const index1 = newList.indexOf(this.swap);
            const index2 = newList.indexOf(dim);
        
            // Check if both items exist in the list
            if (index1 !== -1 && index2 !== -1) {
              // Swap the items in the new list
              [newList[index1], newList[index2]] = [newList[index2], newList[index1]];
            }

            
            this.svg.selectAll('.axis line').attr('stroke', 'black');
            this.svg.selectAll('.axis path').attr('stroke', 'black');

            this.swap=null






            d3.select("div#chart_pcp").selectAll("*").remove();
            this.createSvg()

            this.drawPlot(this.data,newList,this.cluster)

          }
      });
  });
  

  const sliderColors = ['#e6194B', '#3cb44b', 'black', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4', '#469990', '#dcbeff', '#9A6324', 'grey', '#800000', '#aaffc3', '#808000', '#ffd8b1', 'grey', '#a9a9a9'];
  labels.forEach((dim,index) => {
    const currentColor = sliderColors[index % sliderColors.length];;
    this.svg.append("text")
      .attr("class", "axis-label")
      .attr("transform", `translate(${x(dim)},${this.height + 20})`) 
      .style("text-anchor", "middle")
      .text(dim)
      .style("font-size", "8px")
      .style("fill",currentColor)
      
     
  });

this.svg.append("text")
    .attr("x", this.width / 2) 
    .attr("y", -25)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .style("font-weight", "bold")  
    .text("Parallel Coordinates");












// const sliderYPosition = this.height -20; // 20px below the SVG plot

// // Append a new SVG element or use an existing one for the slider
// const sliderSvg = d3.select("#chart_pcp").append("svg")
//     .attr("width", this.width+20)
//     .attr("height", 50) // Arbitrary height for the slider container
//     .append("g")
//     .attr("transform", `translate(10, 20)`);

// // Create the slider
// sliderSvg.append("line")
//     .attr("class", "slider-line")
//     .attr("x1", 0)
//     .attr("y1", 0)
//     .attr("x2", this.width)
//     .attr("y2", 0)
//     .style("stroke", "#000")
//     .style("stroke-width", "2");

// // Add a draggable circle to act as the slider handle
// const handle = sliderSvg.append("circle")
//     .attr("class", "slider-handle")
//     .attr("cx", this.width / 2) // Assuming 'this.width' is defined and accessible
//     .attr("cy", 0)
//     .attr("r", 8)
//     .style("fill", "#666");

// // Apply the drag behavior
// const drag = d3.drag<SVGCircleElement, unknown>()
//     .on("drag", function(event) {
//         const x = Math.max(0, Math.min(700, event.x)); // Constrain to slider bounds
//         d3.select(this).attr("cx", x);
//         // Implement your logic here
//     });

// // Now apply the drag behavior to the handle
// handle.call(drag as any);


// Assuming your parallel coordinates are drawn and `x`, `y`, `this.width`, and `this.height` are defined

//const sliderColors = ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4', '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9'];
let filterExtents:any = {};
labels.forEach(dim => {
  const domainRange = y[dim].domain();
  const highestValue = domainRange[domainRange.length - 1]; // Get the highest value from the domain
  filterExtents[dim] = highestValue; // Store it as both the lower and upper bounds
});



labels.forEach((dim,index) => {
  // Slider container, positioned under the axis
  const sliderSvg = d3.select("#chart_pcp").append("svg")
      .attr("class", "slider-svg")
      .attr("width", 78) // Fixed width for the slider
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
     this.label=this.response.full_col;
     this.cluster=this.response.kmeans[this.k]['cluster_labels'];
     this.response.full_dataset.forEach((e:any,i:any) => {
       this.data.push({

        'Age':e[0],
        'Gender':e[1],
        'Dependent':e[2],
        'Education':e[3],
         'Income':e[4], 
        'Months':e[5], 
        'Product':e[6], 
        'Limit':e[7], 
        'Balance':e[8], 
        'Open to buy':e[9], 
        'Amt change':e[10], 
        'Trans. Amt':e[11],
        'Trans. Count':e[12], 
        'Count Change':e[13],
        'Utilization':e[14]







        })
      
      });

     


     
   

     const svg = d3.select("div#chart_pcp"); 
     svg.selectAll("*").remove();
     this.createSvg()

     this.drawPlot(this.data,this.label,this.cluster)





  
 }



 private dragstarted(event: any) {
  d3.select(event.sourceEvent.target.parentElement).raise(); // Raise the axis being dragged
}

private dragged(event: any, d: any, x:any) {
  d.x = event.x; // Update the position of the dragged dimension
  // Update the axis position
  d3.select(event.sourceEvent.target.parentElement).attr("transform", `translate(${event.x},0)`);
  // Reorder dimensions based on the drag and redraw the chart
  this.label.sort((a:any, b:any) => this.position(a,x) - this.position(b,x));
  this.drawPlot(this.data,this.label,this.cluster)
}

private dragended(event: any, d: any) {
  // Finalize the drag, potentially updating data and visuals
}

private position(dim: string,x:any): number {
  // Assuming `this.x` is your d3.scalePoint for the x-axis
  return x(dim);
}

 @HostListener('unloaded')
ngOnDestroy() {
    console.log('Cleared');
    const svg = d3.select("div#chart_pcp"); 

    svg.selectAll("*").remove();
}


}
