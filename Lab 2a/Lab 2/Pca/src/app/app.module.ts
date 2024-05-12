import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { ToggleDirective } from './dashboard/sidebar/toggle.directive';


import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { D3BarComponent } from './page/d3-bar/d3-bar.component';
import { D3ScatterplotComponent } from './page/d3-scatterplot/d3-scatterplot.component';
import { D3HistogramComponent } from './page/d3-histogram/d3-histogram.component';

import {  HttpClient,HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { D3PcaComponent } from './page/d3-pca/d3-pca.component';
import { D3ScattermatrixComponent } from './page/d3-scattermatrix/d3-scattermatrix.component';
import { D3KmseComponent } from './page/d3-kmse/d3-kmse.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ToggleDirective,


    D3BarComponent,
    D3ScatterplotComponent,
    D3HistogramComponent,
    D3PcaComponent,
    D3ScattermatrixComponent,
    D3KmseComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTooltipModule,
    MatRippleModule,
    HttpClientModule,
 
 
    

   
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
