import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColorDesignComponent } from '../color-design/color-design.component';

@Component({
  selector: 'app-choose-outer-color',
  templateUrl: './choose-outer-color.component.html',
  styleUrls: ['./choose-outer-color.component.scss']
})
export class ChooseOuterColorComponent implements OnInit {

  designImages =[
    "assets/color/1.jpg",
    "assets/color/2.jpg",
    "assets/color/3.jpg",
    "assets/color/4.jpg",
    "assets/color/5.jpg",
    "assets/color/6.jpg",
    "assets/color/7.jpg",
    "assets/color/8.jpg",
    "assets/color/9.jpg",
    "assets/color/10.jpg",
    "assets/color/11.jpg",
    "assets/color/12.jpg",
    "assets/color/13.jpg",
    "assets/color/14.jpg",
    "assets/color/15.jpg",
    "assets/color/16.jpg",
    "assets/color/17.jpg",
    // Universal colors
    "assets/color/universal_colors/1.jpg",
    "assets/color/universal_colors/2.jpg",
    "assets/color/universal_colors/3.jpg",
    "assets/color/universal_colors/4.jpg",
    "assets/color/universal_colors/5.jpg",
    "assets/color/universal_colors/6.jpg",
    "assets/color/universal_colors/7.jpg",
    "assets/color/universal_colors/8.jpg",
    "assets/color/universal_colors/9.jpg",
    "assets/color/universal_colors/10.jpg",
    "assets/color/universal_colors/11.jpg"
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  updateColor(a,b){

  }

  //Dialoge to show image design color
  openDialog(index:number) {
    const dialogRef = this.dialog.open(ColorDesignComponent,{
      height:'534px',
      width: '400px',
      data:{
        image: `${this.designImages[index]}`
      },
      panelClass: 'color-image-modalbox'
    }); 
    
  }
  

}
