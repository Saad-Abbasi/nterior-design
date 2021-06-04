import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-step',
  templateUrl: './start-step.component.html',
  styleUrls: ['./start-step.component.scss']
})
export class StartStepComponent implements OnInit {
  paletteColour:any;
  selected:any;
  selected_slope:any;
  door_status:any;
  imageUrl:string;
  constructor() { }

  ngOnInit(): void {

    this.selected=1;
    this.selected_slope = 1;
    this.door_status = 1;
    this.imageUrl = 'assets/'+'5.png';

  }

  change(n) {
    this.paletteColour = 'warn';
    this.selected=n;
  }
  change_slope(n) {
    this.paletteColour = 'warn';
    this.selected_slope=n;
  }
  door(n) {
    this.paletteColour = 'warn';
    this.door_status =n;
  }
}
