import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {DataSharingService} from '../../../shared/data-sharing.service';
import {ICloset}  from'../../../shared/i-closet'
import { ColorDesignComponent } from '../dialogs/color-design/color-design.component';
import {IColorDesign} from '../../../shared/i-color-design'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fifth-step',
  templateUrl: './fifth-step.component.html',
  styleUrls: ['./fifth-step.component.scss']
})
export class FifthStepComponent implements OnInit {
cabnetWidth:number;
cabnetWidth2:number;
cabnetHeight:number;
cabnetHeight2:number;
cabnetDepth:number;
slope:boolean;       //Added to determine design
closets:ICloset[];
public design:IColorDesign ={};//image handle interior
widthAreaBox ='800px';
innerColor:string;
innerColorName:string;
outerColor:string;
outerColorName:string;
handle:string;
boxForm:FormGroup;
price;
isInnerColor = 'true';
totalPirceOfColorInner = 0;
uniColorPercent;
woodenColorPercent;
selectedPercnt;
borderSlope;
slopeDirection;
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
  // "assets/color/11.jpg",
  // "assets/color/12.jpg",
  // "assets/color/13.jpg",
  // "assets/color/14.jpg",
  // "assets/color/15.jpg",
  // "assets/color/16.jpg",
  // "assets/color/17.jpg",
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
  // "assets/color/universal_colors/11.jpg"
];
// designImagesUniversal =[
//   "assets/color/universal_colors/1.jpg",
//   "assets/color/universal_colors/2.jpg",
//   "assets/color/universal_colors/3.jpg",
//   "assets/color/universal_colors/4.jpg",
//   "assets/color/universal_colors/5.jpg",
//   "assets/color/universal_colors/6.jpg",
//   "assets/color/universal_colors/7.jpg",
//   "assets/color/universal_colors/8.jpg",
//   "assets/color/universal_colors/9.jpg",
//   "assets/color/universal_colors/10.jpg",
//   "assets/color/universal_colors/11.jpg"
// ];


constructor(private _DataSharing: DataSharingService,
            private dialog: MatDialog) { }

  ngOnInit(): void {

    this._DataSharing._slope$.subscribe(result=>{
      if(result == 'true'){
        this.slope = true;
        // getting slope direction
        this._DataSharing._slopeDirection$.subscribe(result=>{
          this.slopeDirection = result;
          // Getting border for slope
          this._DataSharing._borderSLope$.subscribe(result=>{
            this.borderSlope = result;
          })
        })
        
      }
      else{
        this.slope = false
      }
    });

    this._DataSharing.cabinetData$
    .subscribe((result:any)=>{
      this.cabnetWidth = result.cabnetWidth;
      this.cabnetHeight = result.cabnetHeight
      this.cabnetWidth2 = result.cabnetWidth2;
      this.cabnetHeight2 = result.cabnetHeight2
      this.cabnetDepth = result.cabnetDepth;
      console.log(result.cabnetDepth)
    });

    this._DataSharing._closetLayout$.subscribe((result:any)=>{
      this.closets = result;
    });

    //form for validateion 
    this.boxForm = new FormGroup({
      boxFull: new FormControl('', [Validators.required]),
    });
     //getting price 
     this._DataSharing._price$.subscribe((result)=>{
      this.price = result;
    });
    
     
  }
 
  addPercentage(){
     // Calculation of percentatge uni & wooden
     if(this.price){
    this.uniColorPercent = (12/100) * this.price;
     console.log(this.uniColorPercent, 'uni color percentage');
     this.woodenColorPercent = (24/100)*this.price;
     console.log('woodent color peretn', this.woodenColorPercent)
     }
     this.addPercentage = undefined;
  }
  
  //Update Color/image
 
  updateColor(i:number,nameOfColor:string){
    if(this.addPercentage ){
      this.addPercentage();
    }
    if (this.selectedPercnt) {
      this.price = this.price - this.selectedPercnt;
      this.price = this.price.toFixed(2);
      
    }
    let colorType = this.designImages[i];

    

    if( colorType && colorType.includes("universal_colors") &&  !colorType.includes('1.jpg') &&  !colorType.includes('2.jpg')){
     this.selectedPercnt = this.uniColorPercent;
      this.totalPirceOfColorInner = parseFloat(this.price) + parseFloat(this.selectedPercnt);
      this.price = this.totalPirceOfColorInner;
      this.price = this.price.toFixed(2);
      this._DataSharing.updatePrice(this.price);
    }
    else if (colorType && !colorType.includes("universal_colors") &&  !colorType.includes('1.jpg')){
      this.selectedPercnt = this.woodenColorPercent;
      
      this.totalPirceOfColorInner = parseFloat(this.price) + parseFloat(this.selectedPercnt);
      this.price = this.totalPirceOfColorInner;
      this.price = this.price.toFixed(2);
      this._DataSharing.updatePrice(this.price);
    }
    else{
      this.selectedPercnt = 0;
      this._DataSharing.updatePrice(this.price);
    }

    if (this.isInnerColor == 'true') {
      this.innerColor = this.designImages[i];
      this.innerColorName = nameOfColor;
      //Asign and Sharing values to subscribers
  
    this.design.innerColorImg = this.designImages[i];
    this.design.innerColorName = nameOfColor;
    }
 else{
  this.outerColor = this.designImages[i];
    this.outerColorName  = nameOfColor;
    // Asign and share values to subsicrbers
    this.design.outerColorImg = this.designImages[i];
    this.design.outerColorName = nameOfColor;
 }

    this._DataSharing.sendColorImage(this.design);
    
    this.validateBoxForm();
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
// color inner or outer 
onValChange(value) {
  this.isInnerColor = value;
}
validateBoxForm(){
  if(this.innerColor){
    this.boxForm.setValue({
      boxFull:'abc'
    });
    
  }
  else{
    this.boxForm.setValue({
      boxFull:null
    })
  }
}
}
