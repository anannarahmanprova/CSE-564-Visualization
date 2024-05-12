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


  xaxis:any;
  yaxis:any;
  cat:any;
  map:any;
  mapy:any;

  data:any;
  label:any;
  @Input() k: any;

 

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

  private drawPlot(data: any[], label:any[]): void {

     let color=['#FF0000','#00FFFF','#0000FF','#FBC02D','#FFFF00',
     '#00FF00','#1976D2', '#388E3C', '#FBC02D', '#8E24AA','#7FFFD4']





    let xmax= d3.max(data, (d) => { return Number(d[0]); })||0
    let xmin= d3.min(data, (d) => { return Number(d[0]); })||0


    let xScale = d3.scaleLinear().range([0, this.width]);
    

    xScale.domain([xmin,xmax])
   


  


    this.svg.append("g").attr("transform", "translate(0," + this.height + ")")
    .call(this.d3.axisBottom(xScale))
    .selectAll("text")
    .attr('transform', 'translate(-10, 0)rotate(-45)')
      .style('text-anchor', 'end')
      .style("font-size", "12px");
    
    ;



    let ymax= d3.max(data, (d) => { return Number(d[1]); })||0
    let ymin= d3.min(data, (d) => { return Number(d[1]); })||0




    let yScale = d3.scaleLinear().range([this.height, 0]);
    yScale.domain([ymin,ymax]);
   



 
   

    this.svg.append("g")
    .call(this.d3.axisLeft(yScale))
    .selectAll("text")
   
      .style('text-anchor', 'end')
      .style("font-size", "12px");
    
      this.svg.append("g").selectAll(".circle") //created dynamic bars with our data using the SVG rectangle element.
        .data(data)
        .enter().append("circle")
        .attr("r", 2)
        .attr("cx", function (d:any) { return xScale(d[0]); })
        .attr("cy", function (d:any) { return yScale(d[1]); })
        .style("fill", function (d:any, i:any) { 
            return color[label[i]];
        })

   
    // const dots = this.svg.append('g');
    // dots.selectAll("dot")
    // .data(this.data)
    // .enter()
    // .append("circle")
    // .attr("cx", function (d:any) { console.log(xScale(d[0])); return xScale(d[0]); })
    //     .attr("cy", function (d:any) { return yScale(d[1]); })
    //     .style("fill", function (d:any, i:any) { 
    //         return color[label[i]];
    //     })
    // .style("opacity", 1)
    // .style("fill", (d: any) =>color[d['color']]);


    // dots.selectAll("text")
    // .data(this.data)
    // .enter()
    // .append("text")
    // .text( (d: any) => d.Framework)
    // .attr("x", (d: any) => x(d['pca1']))
    // .attr("y", (d: any)  => y(d['pca2']))



    this.svg.append("text")
    .attr("x", this.width / 2) 
    .attr("y", -25)
    .attr("text-anchor", "middle")
    .attr("font-size", "22px")
    .style("font-weight", "bold")  
    .text("MDS Data Plot");





   this.svg.append("text")
    .attr("fill", "#000")
    .attr("transform", `translate(${this.width / 2},${this.height +50})`) 
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")  
    .text("Dimension 1");


this.svg.append("text")
    .attr("fill", "#000") 
    .attr("transform", "rotate(-90)") 
    .attr("y", 0 - this.margin.x+50)
    .attr("x", 0 - (this.height / 2))
    .attr("dy", "1em") 
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")  
    .text("Dimension 2");


   


  




 






}


ngOnChanges(changes: SimpleChanges): void{





 


     this.data=this.response.mds_data;
     this.label=this.response.kmeans[this.k]['cluster_labels'];
    //  this.response.mds_data.forEach((e:any,i:any) => {
    //   this.data.push({"pca1":e[this.pca.x],"pca2":e[this.pca.y], "color": this.response.kmeans[this.k]['cluster_labels'][i]})
      
    //  });

     


     
   

     const svg = d3.select("div#chart"); 
     svg.selectAll("*").remove();
     this.createSvg()

     this.drawPlot(this.data,this.label)





  
 }


 @HostListener('unloaded')
ngOnDestroy() {
    console.log('Cleared');
    const svg = d3.select("div#chart"); 

    svg.selectAll("*").remove();
}

}
