import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {DataSharingService} from './../../shared/data-sharing.service';
import {ISharedFormLabel} from '../../shared/i-shared-form-label'

@Component({
  selector: 'app-shared-form',
  templateUrl: './shared-form.component.html',
  styleUrls: ['./shared-form.component.scss']
})
export class SharedFormComponent implements OnInit {
barForm; // For bars left,right,top,bottom
price=0;
priceArray = [0,0,0,0];
rightLabel ="Paslat rechts";
leftLabel ="Paslat links";
rightReadOnly = false;
leftReadOnly = false;
topReadOnly = false;
bottomReadOnly = false;
designImage :string;
cabnetWidth:number;
cabnetWidth2:number;
priceOfColorSide = 0;
outerColor:string;
sharedFormLabels:ISharedFormLabel;
topBar;
rightBar;
bottomBar;
leftBar;
tempTest = 0;

  constructor(private _sharedData: DataSharingService) { 
  
    this.barForm = new FormGroup({
      leftBar: new FormControl(5, [Validators.min(2),Validators.required]),
      rightBar: new FormControl(5, [Validators.min(2),Validators.required]),
      topBar : new FormControl(5, [Validators.min(2),Validators.required]),
      bottomBar: new FormControl(10, [Validators.min(10),Validators.required]),
  });
 
    
  }
 

  ngOnInit(): void {
    
    this.sharedFormLabels = {
      leftLabel:this.leftLabel,
      rightLabel:this.rightLabel,
      leftReadOnly:this.leftReadOnly,
      rightReadOnly:this.rightReadOnly,
      topReadOnly: this.topReadOnly,
      bottomReadOnly: this.bottomReadOnly
      }
      this._sharedData._sharedFormDisable$.subscribe((result:Boolean)=>{
        if (result== true) {
          this.barForm.disable();
        }
      })
      
    this._sharedData.updateSharedFormLabels(this.sharedFormLabels);

    this._sharedData._sharedFormLabels$.subscribe((result:any)=>{
      
      this.leftLabel = result.leftLabel,
      this.rightLabel = result.rightLabel,
      this.leftReadOnly = result.leftReadOnly,
      this.rightReadOnly = result.rightReadOnly,
      this.topReadOnly = result.topReadOnly,
     this.bottomReadOnly = result.bottomReadOnly
    })

    // this._sharedData.updateSharedFormLabels(this.sharedFormLabels);
    this.getFormValues()
    this.getCabnetData();
    
    this.imageBasedRender()
      
     
     
 
  }
  imageBasedRender(){
   
    this._sharedData._imageUrl$.subscribe(result =>{

      if(this.sendImage){
        this.sendImage(result);
        this.designImage = result;
        
      }
      // if(this.designImage == undefined) 
      // return;
      console.log(this.designImage, 'result in images base render');
      if (result == '7.jpg'|| result=='3.jpg') {
        
        this.leftLabel = 'Opzet links';
        console.log('left label set',this.leftLabel)
        this.barForm.patchValue({leftBar:2});
        this._sharedData.updateSharedForm(this.barForm.value);
        this.leftReadOnly = true;
        this._sharedData.updateSharedFormLabels(this.sharedFormLabels);
        this.onValueChange();
        
      }
  
      else if (result == '6.jpg'|| result=='1.jpg') {
        this.rightLabel = 'Opzet rechts';
        this.barForm.patchValue({rightBar:2});
        this._sharedData.updateSharedForm(this.barForm.value);
        this.rightReadOnly = true;
        this.onValueChange();
      }
      else if(result == '4.jpg'){
        this.leftLabel = 'Opzet links';
        this.rightLabel = 'Opzet rechts';
        this.barForm.patchValue({rightBar:2});
        this.barForm.patchValue({leftBar:2});
        this._sharedData.updateSharedForm(this.barForm.value);
        this.rightReadOnly = true;
        this.leftReadOnly = true;
        this.onValueChange();
        
      }
      else{
        this.onValueChange();
      }
      
      console.log('desing img in img base rende',this.designImage)
    });
    
    
  }
 
  sendImage(desinImage){
    this.designImage = desinImage;
    console.log('in send images', this.designImage)
    
    this.sendImage = undefined;
  }


 
  getOuterColorImg(){
    this.price - this.priceOfColorSide;
    this._sharedData._colorImages$.subscribe((data:any)=>{
      
      this.outerColor = data.outerColorImg;
      if(this.outerColor && this.outerColor.includes("universal_colors")){
        this.priceOfColorSide = 39.00;
        this.price += this.priceOfColorSide;
      }
      else if (this.outerColor){
        this.priceOfColorSide = 46.50;
        this.price += this.priceOfColorSide;
      }
      else {
        this.priceOfColorSide = 0;
        this.price += this.priceOfColorSide;
      }
      this.onValueChange()
    });

  }
 getCabnetData(){
  this._sharedData.cabinetData$
  .subscribe((result:any)=>{
    this.cabnetWidth = result.cabnetWidth;
    this.cabnetWidth2 = result.cabnetWidth2;
    // this.imageBasedRender();
 
  });
  
 }

  getFormValues(){
    this._sharedData._sharedForm$
    .subscribe((result:any)=>{
      this.barForm.setValue({
        leftBar:result.leftBar,
        rightBar:result.rightBar,
        topBar:result.topBar,
        bottomBar:result.bottomBar
      })
      
    });
    
  }
 

  onValueChange(){
    this.getFormValues();
    ;
    this._sharedData._sharedFormLabels$.subscribe((result:any)=>{
      this.leftLabel = result.leftLabel
      this.rightLabel = result.rightLabel
      this.leftReadOnly = result.leftReadOnly;
      this.rightReadOnly = result.rightReadOnly
    });
    this._sharedData._sharedForm$.subscribe((result:any) =>{
      this.topBar = result.topBar;
      this.rightBar = result.rightBar;
      this.bottomBar = result.bottomBar;
      this.leftBar = result.leftBar;
      console.log('data of right form in shared form',result)
      
    });
    
    // this.barForm ={
    //     topBar: this.topBar,
    //     rightBar: this.rightBar,
    //     bottomBar: this.bottomBar,
    //     leftBar: this.leftBar,
    // }

    for (let i = 0; i < this.priceArray.length; i++) {
      this.price -= this.priceArray[i];
    }
    
    this.calculatePriceLeft(this.barForm.get('leftBar').value);
    this.calculatePriceRight(this.barForm.get('rightBar').value);
    this.calculatePriceTop(this.cabnetWidth);
    this.calculatePriceBottom(this.cabnetWidth);

    // updating values 
   console.log(this.designImage)
    //eliminating the value of top bottom
    if(this.designImage == '4.jpg'){
      this.priceArray[0] = 0;
      this.priceArray[1] = 0;
    }
    if (this.designImage == '7.jpg'|| this.designImage =='3.jpg') {
      this.leftLabel = 'Opzet links';
      this.leftReadOnly = true;
      this.priceArray[0] = 0;
    }
    if (this.designImage == '6.jpg'|| this.designImage =='1.jpg') {
      this.rightLabel = 'Opzet rechts';
      this.rightReadOnly= true;
      this.priceArray[1] = 0;
    }
    if(this.designImage){
      for (let i = 0; i < this.priceArray.length; i++) {
        // console.log('price of each side is ',i ,this.priceArray[i])
        
        this.price += this.priceArray[i];
      }
      this.sharedFormLabels.leftLabel = this.leftLabel;
      this.sharedFormLabels.rightLabel = this.rightLabel;
      this.sharedFormLabels.leftReadOnly = this.leftReadOnly;
      this.sharedFormLabels.rightReadOnly = this.rightReadOnly;

      
      this._sharedData.updateSharedFormLabels(this.sharedFormLabels)
      this._sharedData.updatePrice(this.price);
      console.log(this.barForm.value)
      this._sharedData.updateSharedForm(this.barForm.value);
      
    }
    
    
    }
    
 
 
// Removing double calculations ... / will be remain same will not do double
  calculatePriceLeft(val){
    this.priceArray[0] = 16.50;
    // if (val< 12) {
    //   this.priceArray[0] = 16.50;
    // }
    // else {
    //   this.priceArray[0] =   33;
    // }
  }
  calculatePriceRight(val){
    this.priceArray[1] =  16.50;
    // if (val< 12) {
    //   this.priceArray[1] =  16.50;
    // }
    // else {
    //   this.priceArray[1] =  33;
    // }
  }
  calculatePriceTop(val){
    this.getCabnetData();
    
    if(this.cabnetWidth2){
      if(this.cabnetWidth2<=280){
        this.priceArray[2] =  16.50;
      }
      else{
        this.priceArray[2] = 25.20;
      }
    }else{
      if(val<=280){
        this.priceArray[2] =  16.50;
      }
      else{
        this.priceArray[2] = 25.20;
      }
    }
    
  }
  calculatePriceBottom(val){
    if(val<=280){
      this.priceArray[3] =  85;
    }
    else{
      this.priceArray[3] = 130;
    }
  }
  
  // disable shared form 
 
 

}
