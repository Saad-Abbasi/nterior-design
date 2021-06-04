import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/shared/data-sharing.service';
import { ICloset } from 'src/app/shared/i-closet';
import { IColorDesign } from 'src/app/shared/i-color-design';
import { ChooseOuterColorComponent } from '../dialogs/choose-outer-color/choose-outer-color.component';
import { ColorDesignComponent } from '../dialogs/color-design/color-design.component';

@Component({
  selector: 'app-sixth-step',
  templateUrl: './sixth-step.component.html',
  styleUrls: ['./sixth-step.component.scss']
})
export class SixthStepComponent implements OnInit {
  cabnetWidth:number;
  cabnetWidth2:number;
  cabnetHeight:number;
  cabnetHeight2:number;
  cabnetDepth:number;
  slope:boolean; //to determine design slope or not
  closets:ICloset[];
  closetsBackup:ICloset[];
  design:IColorDesign;//image handle interior
  widthAreaBox ='800px';
  innerColor:string;
  innerColorName:string;
  outerColor:string;
  outerColorName:string;
  handle:string;
  handleName:string;
  singleDoorImage:string;
  bgImage=[];
  doorImag;
  price;
  boxForm:FormGroup;
  backupCloset=[];
  backupInnerImages=[];
  isDoor = 'false';
  priceOfColorSide = 0;
  doorPrice = 0 ;
  designImage:string;
  scalVal = [];
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
  constructor(private _DataSharing: DataSharingService,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    // if(!this.outerColor){
    //   this.outerColor = this.designImages[0]
    // }
   
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

    this._DataSharing._imageUrl$.subscribe(result =>{
      this.designImage = result;
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
      console.log(this.closets)
      this.bgImage.length = Object.keys(this.closets).length;
      this.backupCloset.length = Object.keys(this.closets).length;
     for (let i = 0; i < result.length; i++) {
        this.scalVal[i] = 'scaleX(1)';
     }
    });
   
    
    
    
    if(!this.closets){
this.closets=[{index: 1, cols: 2, boxWidthTest: "40%", widthInCm: "100.0cm", closetDesignImage: "http://localhost:4200/assets/CpBox/big_box/2.png"},
              {index: 1, cols: 1, boxWidthTest: "20%", widthInCm: "50.0cm", closetDesignImage: "http://localhost:4200/assets/CpBox/small/4.png"},
              {index: 1, cols: 1, boxWidthTest: "20%", widthInCm: "50.0cm", closetDesignImage: "http://localhost:4200/assets/CpBox/small/3.png"},
              {index: 1, cols: 1, boxWidthTest: "20%", widthInCm: "50.0cm", closetDesignImage: "http://localhost:4200/assets/CpBox/small/4.png"}
              
            ]
              
            
    }
   
   //getting price 
   this._DataSharing._price$.subscribe((result)=>{
    this.price = result
  });
// testing 
  if(!this.price){
    this.price = 500
    this.price = parseFloat(this.price)
  }
    //Data colorImage
  
    this._DataSharing._colorImages$.subscribe((data:any)=>{
      this.design = data;
      this.innerColor = data.innerColorImg;
      this.innerColorName = data.innerColorName;
      this.outerColor = data.outerColorImg;
      
      this.outerColorName = data.outerColorName;
      this.handle = data.handleImg;
      this.handleName = data.handleImgName;
      // Setting the inner box color 
      // this.bgImage = this.innerColor;
      for (let i = 0; i < this.bgImage.length; i++) {
        if (this.isDoor == 'false' || !this.isDoor) {
          this.bgImage[i] = this.innerColor;
        }
        
   
    }});
  

    

    //BoxForm for validation
    this.boxForm = new FormGroup({
      boxFull: new FormControl('', [Validators.required]),
    });
    //calculate outer color image
    
    this.getOuterColorImg();
  }
// Wiil yo add hanle or not ?
isHandle(event){
  this._DataSharing.updateHandleStatus(event);
}
  // Hold copy of initial closets 
  makeCopyOfCloset(closets){
    this.closetsBackup = JSON.parse(JSON.stringify(this.closets));
    
  
    console.log(this.closets, 'Copy ', this.closetsBackup)
    this.makeCopyOfCloset = undefined; //Killing fun
  }
  getOuterColorImg(){
    
    this._DataSharing._colorImages$.subscribe((data:any)=>{
      this.outerColor = data.outerColorImg;
      if(this.outerColor && this.outerColor.includes("universal_colors") &&  !this.outerColor.includes('1.jpg') && !this.outerColor.includes('2.jpg')){
        this.priceOfColorSide = 39.00;
        
      }
      else if (this.outerColor && !this.outerColor.includes('1.jpg') && !this.outerColor.includes("universal_colors")){
        this.priceOfColorSide = 46.50;
        
      }
      else {
        this.priceOfColorSide = 0;
        
      }
     
    });

  }
  //Handle images Data
  handleImages=[
    'assets/handle/1.jpg',
    'assets/handle/2.jpg',
    'assets/handle/3.jpg',
    'assets/handle/4.jpg',
    'assets/handle/5.jpg',
    'assets/handle/6.jpg',
    'assets/handle/7.jpg',
    'assets/handle/8.jpg',
    'assets/handle/9.jpg',
    'assets/handle/10.jpg',
    'assets/handle/11.jpg',
    'assets/handle/12.jpg',
    'assets/handle/13.jpg',
  ]
  doorImages =[
    'assets/doors/single.png',
    'assets/doors/doorFull.png'
  ]
  addHandle(i:number,nameOfHandle:string){
    this.handle = this.handleImages[i];
    this.handleName = nameOfHandle;
    this.design.handleImg = this.handle;
    this.design.handleImgName = this.handleName;
    this._DataSharing.sendColorImage(this.design)
    this.validateBoxForm();
  }

  //WHether dooor shod added or not 
  onValChange(value) {
   
    if(this.doorPrice > 0){
      this.price = this.price - this.doorPrice;
      this.doorPrice = 0;
    }
    
    if(!this.outerColor){
      this.outerColor = this.designImages[0];
    }

    if(this.makeCopyOfCloset ){
      this.makeCopyOfCloset(this.closets);
    }
    this.isDoor = value;
    if(this.isDoor == 'true'){
      for (let i = 0; i < this.closets.length; i++) {
        this.bgImage[i] = this.outerColor;
        if (this.closets[i].cols == 2) {
          this.closets[i].closetDesignImage = this.doorImages[1]
          if(this.outerColor && this.outerColor.includes("universal_colors")){
            if(this.outerColor.includes('2.jpg')){
              this.doorPrice += 39*2
            }else{
              this.doorPrice += 45*2;
            }
            
          }
          else {
            if(this.outerColor.includes('1.jpg')){
              this.doorPrice += 39*2
            }else{
              this.doorPrice += 50*2;
            }
            
          }
        }
        else{
          this.closets[i].closetDesignImage = this.doorImages[0]
          if(this.outerColor && this.outerColor.includes("universal_colors")){
            if(this.outerColor.includes('2.jpg')){
              this.doorPrice += 39
            }else{
              this.doorPrice += 45;
            }
            
          }
          else {
            if(this.outerColor.includes('1.jpg')){
              this.doorPrice += 39
            }else{
              this.doorPrice += 50;
            }
            
          }
        }
        
      }
      // this.doorPrice = parseFloat(this.doorPrice)
      
      this.price = parseFloat(this.price)
      this.price += this.doorPrice;
      this.price = this.price.toFixed(2)
      console.log(this.doorPrice,this.price,'<= Door Price');
      this._DataSharing.updatePrice(this.price);
    }
    else{
      for (let i = 0; i < this.closets.length; i++) {
        if(this.isDoor =='false'){
        this.closets[i].closetDesignImage = this.closetsBackup[i].closetDesignImage
        this.bgImage[i] = this.innerColor;
        }
        
      }
      
    }
    
    
}

//updating data on with door or without door
doorsUpdateonTOggle(){
  
}



  // addDoor(i:number, boxSize:number){
  //   if(!this.outerColor){
  //     alert('Kies eerst de buitenste kleur');
  //     return;
  //   }
  //   console.log('THis run without Outer color')
  //   if(this.isDoor == 'true'){
  //     let imageAddress;
  //   this.backupCloset.length =  Object.keys(this.closets).length;
     

  //   //Hold image addres for later use
  //   if(typeof this.backupCloset[i] === 'undefined'){
  //    imageAddress  = this.closets[i].closetDesignImage;
  //   }
    
  //   //Color 
  //   // this.bgImage = this.innerColor;
  //   // add/remove
   
  //   console.log('image of this box is', imageAddress);

  //   console.log('image addres', this.closets[i].closetDesignImage)

  //   if (boxSize == 1) {
  //     if(typeof this.backupCloset[i] === 'undefined' && imageAddress.includes('CpBox')){
  //       this.backupCloset.splice(i, 0,imageAddress);
  //       this.bgImage[i] = this.innerColor;
  //       this.closets[i].closetDesignImage = this.doorImages[0];
  //       console.log(' image backup',i, this.backupCloset[i])
  //     }
  //     else if(this.closets[i].closetDesignImage === null){
  //       this.bgImage[i] = this.outerColor;
  //       this.closets[i].closetDesignImage = this.doorImages[0];
  //     }
  //     else if(!this.closets[i].closetDesignImage.includes('CpBox')){
        
  //       console.log('Else case called', this.backupCloset[i])
        
  //       this.closets[i].closetDesignImage = this.backupCloset[i];
  //       this.bgImage[i] = this.innerColor;
  //     }
  //     else{
  //       this.bgImage[i] = this.outerColor;
  //       this.closets[i].closetDesignImage = this.doorImages[0];
  //     }
      
  //   }
  //   else{
      
  //     if(typeof this.backupCloset[i] === 'undefined' && imageAddress.includes('CpBox')){
  //       this.backupCloset.splice(i, 0,imageAddress);
  //       this.bgImage[i] = this.outerColor;
  //       this.closets[i].closetDesignImage = this.doorImages[1];
  //       console.log(' image backup',i, this.backupCloset[i] , 'and this is outer color', this.outerColor)
  //     }
  //     else if(this.closets[i].closetDesignImage === null){
  //       this.bgImage[i] = this.outerColor;
  //       this.closets[i].closetDesignImage = this.doorImages[1];
  //     }
  //     else if(!this.closets[i].closetDesignImage.includes('CpBox')){
        
  //       this.closets[i].closetDesignImage = this.backupCloset[i];
  //       this.bgImage[i] = this.innerColor
  //     }
  //     else{
  //       this.bgImage[i] = this.outerColor;
  //       this.closets[i].closetDesignImage = this.doorImages[1];
  //     }
  //   }
  //   }

  //   else{
  //     return;
  //   }

  // }

  flipDoor(i){
    if(this.scalVal[i] == 'scaleX(1)'){
      this.scalVal[i] = 'scaleX(-1)'
      
    }
    else{
      this.scalVal[i] = 'scaleX(1)'
    }
    this._DataSharing.updatDoorFlip(this.scalVal)
  }
  validateBoxForm(){
    if(this.outerColor){
      this.boxForm.setValue({
        boxFull:'abc'
      });
    }
    else{
      
      this.boxForm.setValue({
        boxFull:null
      });
      
    }
  }

  // Outer Color
  updateColor(i:number,nameOfColor:string){
    // if(this.isDoor == 'true'){
    //   this.onValChange('false')
    // }
    

    this.price = this.price - this.priceOfColorSide;
    this.outerColor = this.designImages[i];
    for (let i = 0; i < this.closets.length; i++) {
          this.bgImage[i] = this.outerColor;
      
    }
    this.outerColorName  = nameOfColor;
    
    // Asign and share values to subsicrbers
    this.design.outerColorImg = this.designImages[i];
    this.design.outerColorName = nameOfColor;
    // this.design = {innerColorImg:this.innerColor, innerColorName: this.innerColorName,
    //   outerColorImg:this.outerColor,outerColorName:this.outerColorName, handleImg:this.handle, handleImgName:this.handleName}

    this._DataSharing.sendColorImage(this.design);
    this._DataSharing.sendOuterImage(this.bgImage);
    
    this.calculateColorPrice();
    this.validateBoxForm();
  }


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
calculateColorPrice(){
  
  
  if(this.designImage == '4.jpg'){
    this.price += this.priceOfColorSide*2;
  }
  if (this.designImage == '7.jpg'|| this.designImage =='3.jpg') {
    this.price += this.priceOfColorSide;
  }
  if (this.designImage == '6.jpg'|| this.designImage =='1.jpg') {
    this.price += this.priceOfColorSide;
  }
  this.price = this.price.toFixed(2);
  this._DataSharing.updatePrice(this.price);
  
}
 
  // openDialog() {
  //   const dialogRef = this.dialog.open(ChooseOuterColorComponent,{
  //     width: '100%',
  //     // data: { name: this.name, animal: this.animal },
  //     position: {
        
  //       top: '50vh',
  //       left: '1%'
  //     },
  //     panelClass: 'choose-outer-color'

  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //     this.outerColor = this.designImages[result]
      
  //   });
  // }
  
}
