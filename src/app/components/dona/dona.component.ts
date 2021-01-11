import { Component, Input, OnInit } from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() title: string = "Gráfica";
  @Input('labels') public doughnutChartLabels: Label[] = ['Etiqueta 1', 'Etiqueta 2', 'Etiqueta 3'];
  @Input('data') public doughnutChartData = [ 1, 1, 1 ];

  public colors: Color[] = [
    { backgroundColor: [ '#6857E6', '#009FEE', '#F02059'] }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
