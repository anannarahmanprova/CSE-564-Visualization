import { HttpClient } from "@angular/common/http";
import {

  Component,
  HostListener,
  Input,
  OnInit,
  SimpleChanges,

} from "@angular/core";
import * as d3 from 'd3'
// import { PCA } from 'pca-js';
var PCA = require('pca-js')


@Component({
  selector: 'app-d3-scattermatrix',
  templateUrl: './d3-scattermatrix.component.html',
  styleUrls: ['./d3-scattermatrix.component.scss']
})
export class D3ScattermatrixComponent implements OnInit {
  public d3 = d3;
  @Input() response: any;
  @Input() index: any;

  attribute:any;

  dataset:any=[]

  private svg:any;
  // private margin:any={
  //   x:250,
  //   y:350,
  // }
  // private width = 250 ;
  // private height = 100  ;


  private margin:any={
    x:120,
    y:100,
  }
  private width = 850 - this.margin.x*2 ;
  private height = 500 - this.margin.y*2 ;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  
   
  }

  createSvg(){
    this.svg = this.d3
    .select("div#chart_scattermatrix")
    .append("svg")
    .attr(
      "viewBox",
      `0 0 ${this.width + this.margin.x * 2} ${this.height + this.margin.y*2 }`
    )  

    

  }
 




  drawScatterPlotMatrix(dataset:any=[]) {



    this.svg.append("text")
    .attr("x", this.width / 1.4) 
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .attr("font-size", "18px") 
    .style("font-weight", "bold") 
    .text("Scatterplot Matrix");




    for (let i = 0; i < 4; i++) {
        let y_axis_data = dataset[i];
        

        for (let j = 0; j < 4; j++) {
            let x_axis_data = dataset[j];

        

            let data = []
            for (let c = 0; c < x_axis_data.length; c++) {
                data.push([x_axis_data[c], y_axis_data[c]]);
            }
            let heightx = this.height / 4.1;
            let widthx = this.width / 4;

            let xmin:any
            let xmax:any
            xmin=this.d3.min(x_axis_data)
            xmax= d3.max(x_axis_data)


            let xScale = d3.scaleLinear().domain([xmin,xmax]).range([0, widthx]);

            let g = this.svg.append("g").attr("transform", "translate(" + (10 + 100 + j * widthx + j * 25) + "," + (15 + 65 + i * heightx + i * 35) + ")")
                .attr("class", "formatmatrix");

            g.append("g")
                .attr("transform", "translate(0," + heightx + ")")
                .call(d3.axisBottom(xScale).ticks(3))
                .selectAll("text")
                .style('text-anchor', 'end')
                .style("font-size", "8px");

       

            let ymin:any
            let ymax:any
            ymin=this.d3.min(y_axis_data)
            ymax= d3.max(y_axis_data)




            let y = d3.scaleLinear().domain([ymin,ymax]).range([heightx, 0]);
            g.append("g").call(d3.axisLeft(y).ticks(3))
            
            .selectAll("text")
          
            .style('text-anchor', 'end')
            .style("font-size", "8px");

  


               







            if (i!=j){

              g.append('g')
                  .attr("id", "col")
                  .selectAll("dot")
                  .data(data)
                  .enter()
                  .append("circle")
                  .attr("cx", function (d:any) {
                      return xScale(d[0]);
                  })
                  .attr("cy", function (d:any) {
                      return y(d[1]);
                  })
                  .attr("r", 1)
                  .style("fill", "red")
                }
                else{

                  this.svg.append('text')
                  .attr('x', (10 + 100 + j * widthx + j * 25)+60)
                  .attr('y', (15 + 65 + i * heightx + i * 35)+40)
                  .attr('text-anchor', 'middle')
                  .style("font-size", "10px")
          
                  .text( this.attribute[i])

                


                }
               


                

               
    
        }

    }
   // console.log(data1)
    

  }


  


  ngOnChanges(changes: SimpleChanges): void{





    //  this.data=[{pca1:.1, pca2:.2} ,{pca1:.5, pca2:.6},{pca1:.5, pca2:.2}]
  

       this.dataset=[];
       this.attribute=[]
       this.response.index[this.index].forEach((col:any,i:any) => {
        this.dataset[i]=[]
        this.response.dataset.forEach((row:any) => {

          this.dataset[i].push(row[col])
        
        
        });
        this.attribute.push(this.response.col[col])
        
        
       });
       
       

  
      
    
      //console.log(this.dataset)
  
       const svg = d3.select("div#chart_scattermatrix"); 
       svg.selectAll("*").remove();
       this.createSvg()
  
       this.drawScatterPlotMatrix(this.dataset)
  
  
  
    
   }











}













  


  

