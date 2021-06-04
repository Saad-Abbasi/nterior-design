import { Component, Input, OnInit } from '@angular/core';
import {DataSharingService} from '../../../shared/data-sharing.service';
import {MatDialog} from '@angular/material/dialog';
import { ChooseClosetComponent } from '../dialogs/choose-closet/choose-closet.component';
import {ICloset} from '../../../shared/i-closet'
import { ChooseClosetSmallComponent } from '../dialogs/choose-closet-small/choose-closet-small.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fourth-step',
  templateUrl: './fourth-step.component.html',
  styleUrls: ['./fourth-step.component.scss']
})
export class FourthStepComponent implements OnInit {
  cabnetWidth:number;
  cabnetWidth2:number;
  cabnetHeight:number;
  cabnetHeight2:number;
  cabnetDepth:number;
  slope:boolean;       //Added to determine dessign
  maxWidth=800;
  widthAreaBox ='800px';
  availableWidth;
  currentWidth = 0;
  boxWidth = 0;
  imageIndex : number;
  price;
  boxForm:FormGroup;
  priceOfEachCloset = [];
  boxDesignImageName = [];
  slopeDirection;
  borderSlope;
  closets: ICloset[];
  constructor(private _sharedData:DataSharingService,
              public dialog: MatDialog)
               { }

  ngOnInit(): void {
    this._sharedData._slope$.subscribe(result=>{
      if(result == 'true'){
        this.slope = true;
        // getting slope direction
        this._sharedData._slopeDirection$.subscribe(result=>{
          this.slopeDirection = result;
          // Getting border for slope
          this._sharedData._borderSLope$.subscribe(result=>{
            this.borderSlope = result;
          })
        })
        
      }
      else{
        this.slope = false
      }
    });
    
    this._sharedData.cabinetData$
    .subscribe((result:any)=>{
      this.cabnetWidth = result.cabnetWidth;
      this.cabnetHeight = result.cabnetHeight
      this.cabnetDepth = result.cabnetDepth;
      this.cabnetWidth2 = result.cabnetWidth2;
      this.cabnetHeight2 = result.cabnetHeight2
      console.log(result.cabnetDepth)
      this.ngOnInit();
    });

    this._sharedData._closetLayout$.subscribe((result:any)=>{
      this.closets = result;
      
    });
  //  Getting the lenght
  if(this.closets){
    this.boxDesignImageName.length =  this.closets.length;
  }
  
    
    //getting price 
    this._sharedData._price$.subscribe((result)=>{
      this.price = result;
    });
    // form for validateion/
    this.boxForm = new FormGroup({
      boxFull: new FormControl('', [Validators.required]),
    });
    
  }

  updateImageIndex =(indexOfImage) =>{
    this.validateBoxForm();
    if(this.closets[indexOfImage].cols == 2){
      this.openDialog();
    }
    else{
      this.openDialog2();
    }
    
    this.imageIndex = indexOfImage;
   
  }
  addDesignImage = (boxSize,selectedDesign)=>{
    
    for (let i = 0; i < this.priceOfEachCloset.length; i++) {
      if (this.priceOfEachCloset[i]) {
      this.price = this.price - this.priceOfEachCloset[i];
      }
      
    }
    
    if(this.currentWidth <= this.maxWidth){
      
      if(boxSize == 2 ){
        
        this.closets[this.imageIndex].closetDesignImage = selectedDesign;
        let img =  this.closets[this.imageIndex].closetDesignImage
        
        let imgPrice = 0;
        
        
        imgPrice = this.getPriceOfBigCloset(img,this.imageIndex);
        this.priceOfEachCloset[this.imageIndex] = 0;
        this.priceOfEachCloset[this.imageIndex] = imgPrice;
        
        boxSize = 0;
      }
      else if(boxSize == 1){
       
        this.closets[this.imageIndex].closetDesignImage = selectedDesign ;
        let img =  this.closets[this.imageIndex].closetDesignImage;

        let imgPrice = 0;
        imgPrice = this.getPriceOfSmallCloset(img,this.imageIndex)
        this.priceOfEachCloset[this.imageIndex] = 0;
        this.priceOfEachCloset[this.imageIndex] = imgPrice;
        
        console.log('got the price for small closet', this.priceOfEachCloset[this.imageIndex]);
        boxSize = 0;
      }
      else{
        alert('Width size exceeds')
      }
    }
    
    this.calculatePrice();
    this.validateBoxForm();
    
  }
  // Get Price of Big Closet Image
  getPriceOfBigCloset(img,i){
    if (img.includes('11.png')) {
      this.boxDesignImageName[i] = 'Brede kast met 6 legplanken';
      return 212;
    }
    else if (img.includes('10.png')) {
      this.boxDesignImageName[i] = 'Brede kast met 5 legplanken ';
      return 205;
    }
    else if (img.includes('12.png')) {
      this.boxDesignImageName[i] = 'Brede kast met 4 legplanken en kledingstang';
      return 205;
    }
    else if (img.includes('8.png')) {
      this.boxDesignImageName[i] = 'Brede kast met 4 legplanken en 3 laden';
      return 375;
    }
    else if (img.includes('9.png')) {
      this.boxDesignImageName[i] = 'Brede kast met 3 laden 2 legplanken en kledingstang ';
      return 377;
    }
    else if (img.includes('7.png')) {
      this.boxDesignImageName[i] = 'Brede kast met 3 legplanken en kledingstang ';
      return 189;
    }
    else if (img.includes('5.png')) {
      this.boxDesignImageName[i] = 'Brede kast met 5 legplanken en 2 laden ';
      return 329;
    }
    else if (img.includes('6.png')) {
      this.boxDesignImageName[i] = 'Brede kast met 2 laden 3 legplanken en kledingstang';
      return 322;
    }
    else if (img.includes('4.png')) {
      this.boxDesignImageName[i] = 'Brede kast met 2 legplanken en 2 kledingstangen';
      return 189;
    }
    else if (img.includes('2.png')) {
      this.boxDesignImageName[i] = 'Brede kast met 6 legplanken  lade ';
      return 274;
    }
    else if (img.includes('3.png')) {
      this.boxDesignImageName[i] = 'Brede kast met  lade 3 legplanken en kledingstang';
      return 267;
    }
    else if (img.includes('1.png')) {
      this.boxDesignImageName[i] = 'Brede kast met  legplank  kledingstang  kledinglift';
      return 295;
    }
    else{
      return 0;
    }
  }

   // Get Price of Small Closet Image
   getPriceOfSmallCloset(img,i){
    if (img.includes('11.png')) {
      this.boxDesignImageName[i] = 'Kast met 6 legplanken ';
      return 183;
    }
    else if (img.includes('10.png')) {
      this.boxDesignImageName[i] = 'Kast met 5 legplanken ';
      return 175;
    }
    else if (img.includes('12.png')) {
      this.boxDesignImageName[i] = 'Kast met 4 legplanken en kledingstang ';
      return 175;
    }
    else if (img.includes('8.png')) {
      this.boxDesignImageName[i] = 'Kast met 4 legplanken en 3 laden';
      return 346;
    }
    else if (img.includes('9.png')) {
      this.boxDesignImageName[i] = 'Kast met 3 laden 2 legplanken en kledingstang';
      return 355;
    }
    else if (img.includes('3.png')) {
      this.boxDesignImageName[i] = 'Kast met 3 legplanken en kledingstang ';
      return 169;
    }
    else if (img.includes('6.png')) {
      this.boxDesignImageName[i] = 'Kast met 5 legplanken en 2 laden';
      return 288;
    }
    else if (img.includes('7.png')) {
      this.boxDesignImageName[i] = 'Kast met 2 laden 3 legplanken en kledingstang';
      return 293;
    }
    else if (img.includes('2.png')) {
      this.boxDesignImageName[i] = 'Kast met 2 legplanken en 2 kledingstangen ';
      return 169;
    }
    else if (img.includes('4.png')) {
      this.boxDesignImageName[i] = 'Kast met 6 legplanken  lade';
      return 245;
    }
    else if (img.includes('5.png')) {
      this.boxDesignImageName[i] = 'Kast met  lade 3 legplanken en kledingstang';
      return 231;
    }
    else if (img.includes('1.png')) {
      this.boxDesignImageName[i] = 'Kast met 1 legplank 1 kledingstang 1 kledinglift';
      return 293;
    }
    else{
      return 0;
    }
    
  }
  //Calculating price on the base of images ..
  calculatePrice(){
    
    for (let i = 0; i < this.priceOfEachCloset.length; i++) {
      // adding and converting prices into num 
      console.log(typeof(this.price, isNaN(this.price)))
    if(this.priceOfEachCloset[i]){
      this.price = parseFloat(this.price) + parseFloat(this.priceOfEachCloset[i]);
    }
    
    }
    this.price = this.price.toFixed(2)
    this._sharedData.updatePrice(this.price)
  }


  openDialog() {
    const dialogRef = this.dialog.open(ChooseClosetComponent,{
      width: '800px',
      
      position: {
        
        top: '20%',
        left: '5%'
    
      },
      data:{
        height2: `${this.cabnetHeight2}`
      },

      panelClass: 'custom-modalbox'

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.addDesignImage(2,result);
      this.validateBoxForm();
    });
  }
  //Small Box dialog
  openDialog2() {
    const dialogRef = this.dialog.open(ChooseClosetSmallComponent,{
      width: '800px',
      // data: { name: this.name, animal: this.animal },
      position: {
        top: '20%',
        left: '5%'
      },
      data:{
        height2: `${this.cabnetHeight2}`
      },
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.addDesignImage(1,result);
      this.validateBoxForm();
      
    });
  }
  validateBoxForm(){
    let tempResult = 0;
    let lenght = this.closets.length;
    this.closets.forEach(element => {
      if(element.closetDesignImage){
        tempResult++;
      }
    });

    

    if(lenght == tempResult){
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



