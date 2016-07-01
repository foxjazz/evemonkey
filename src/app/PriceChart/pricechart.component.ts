import { Component, OnInit, Output, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import {PriceService} from './price.service'
declare let d3:any;
declare let module: any;

@Component ({
  
  templateUrl: 'app/pricechart/testchart.html',
  styleUrls: ['app/pricechart/pricechart.css'],
  providers: [PriceService]
})

export class PriceChartComponent implements OnInit{
    elem: any;
  mediaService: PriceService;
  width: number;
  height: number;
  color: string;
  meters: any[];
  data: number[];
  shape: any;
  selected: number;
  init: boolean;
  isVisible: boolean;
  ref: ChangeDetectorRef;
  controls: EventEmitter<any>;

  @Output() path: any;
    constructor(ps: PriceService) { }
    
    ngOnInit() {
          var x = d3.scale.linear().domain([0, 512]).range([0, window.innerWidth]),
        y = d3.scale.linear().domain([0, 255]).range([this.height, 0]),
        line = d3.svg.line()
            .interpolate('basis')
            .x(function(d, i) { return x(i); })
            .y(function(d, i) { return y(d); });

    this.shape = this.elem.nativeElement.getElementsByClassName('levels')[0];
    }
}