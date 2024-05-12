import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-d3-pca',
  templateUrl: './d3-pca.component.html',
  styleUrls: ['./d3-pca.component.scss']
})
export class D3PcaComponent implements OnInit {

  constructor(private http: HttpClient) { }
  evalue:any
  k:any=2
  index:any=4
  pca:any={x:0,y:1}

  ngOnInit(): void {
    this.fetchData()

    
  }


  fetchData() {
    this.http.get<any>('http://localhost:5000/api/data').subscribe(
      (response) => {
        
        this.evalue=response
        console.log(response)
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  changek(event:any){
  
    this.k=event.name-1

  }
  changeindex(event:any){
    this.index=event.name-1

  }
  changepca(event:any){
    this.pca=event
  }

}
