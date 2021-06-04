import {  Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import {DataSharingService} from '../../../shared/data-sharing.service';
import {ISharedFormLabel} from '../../../shared/i-shared-form-label'
export interface Closets {
  index:number;
  boxWidthTest:string;
  cols:number;
  widthInCm?:string;
}
export interface Tile {
  index: number;
  color: string;
  cols:  number;
  rows:  number;
  text:  string;
}
@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss']
})
export class ThirdStepComponent implements OnInit {
  cabnetWidth:number;
  cabnetWidth2:number;
  cabnetHeight:number;
  cabnetHeight2:number;
  cabnetDepth:number;
  slope:boolean;       //Added to determine design
  maxWidth:number;
  widthAreaBox ='800px';
  availableWidth;
  currentWidth = 0;
  boxWidth = 0;
  price: number;
  cupBoardSpace = '';
  fullClosetValue:number;
  shortClosetValue:number;
  shortIsDisable:boolean;
  closets: Closets[] = [];
  numberOfBigBoxes:number;
  boxForm:FormGroup;
  topBar;
  rightBar;
  bottomBar;
  leftBar;
  borderSlope="0px 0px 0px 0px";
  topBorder = 0;
  rightBorder = 0;
  bottomBorder = 0;
  leftBorder = 0;
  slopeDirection;
  sharedFormLabels:ISharedFormLabel;
  

  constructor(private _sharedData:DataSharingService,
              private sanitizer: DomSanitizer) { }


             


  ngOnInit(): void {
    
    this._sharedData._slope$.subscribe(result=>{
      if(result == 'true'){
        this.slope = true
      }
      else{
        this.slope = false
      }
    });

    this._sharedData._slopeDirection$.subscribe(result=>{
      this.slopeDirection = result;
    })

    
    
  //right four form fields
  

    this._sharedData.cabinetData$
    .subscribe((result:any)=>{
      this.cabnetWidth = result.cabnetWidth;
      this.cabnetHeight = result.cabnetHeight
      this.cabnetWidth2 = result.cabnetWidth2;
      this.cabnetHeight2 = result.cabnetHeight2
      this.cabnetDepth = result.cabnetDepth;
      this.cupBoardSpace = result.cabnetWidth;
      var getInNum = result.cabnetWidth;
      getInNum.toString().substring(0,2);
      this.maxWidth = getInNum;
      console.log('Assigning border values');
    

      // form validation reset 
      

      // this.calculateWidth(this.maxWidth);

      // Assignin values to slope borders
      // this.topBorder = this.cabnetWidth2;
      // this.rightBorder = this.cabnetHeight2;
      let percentAgeOfBorderWidth = (this.cabnetWidth2/this.cabnetWidth)*100;
      percentAgeOfBorderWidth = 100 - percentAgeOfBorderWidth
      let percentAgeOfBorderHeight = (this.cabnetHeight2/this.cabnetHeight)*100;
      percentAgeOfBorderHeight = 100 - percentAgeOfBorderHeight
      this.topBorder = (percentAgeOfBorderWidth/100)*800;
      this.rightBorder = (percentAgeOfBorderHeight/100)*400;

      if(this.slope == true){
        
          if (this.slopeDirection == 'left') {
            this.borderSlope = `${this.rightBorder}px  ${ this.topBorder}px 0px 0px `;
            console.log('left border is calculated ', this.borderSlope )
          }
          else{
            
            this.borderSlope = `0px  ${ this.topBorder}px ${this.rightBorder}px 0px `;
            console.log('right border is calculated ', this.borderSlope )
          }
        this._sharedData.updateBorderSlope(this.borderSlope);
        
        console.log(this.borderSlope)
    }
    });
    // Gettin slope status 
    
     
    
    //form for validateion 
    this.boxForm = new FormGroup({
      boxFull: new FormControl('', [Validators.required]),
    });
  //  Getting subciber data
  this.getSubscriberData()
  }

  getSubscriberData(){
     // Getting price
     this._sharedData._price$.subscribe((result:any)=>{
      console.log(result , 'test it' ,isNaN(result))
      this.price = parseFloat(result); 
    });
    //Getting values for right form fields
    this._sharedData._sharedForm$.subscribe((result:any) =>{
      this.topBar = result.topBar;
      this.rightBar = result.rightBar;
      this.bottomBar = result.bottomBar;
      this.leftBar = result.leftBar;
      console.log('data of right form in third step',result)
    });
  }



  removeTile =(closet)=>{
    
    if(closet.cols == 2){
      const index = this.closets.indexOf(closet);

      let boxCmSize = this.fullClosetValue;
      // this.price -= 2.45 * boxCmSize;
      // this.price = parseFloat(this.price.toFixed(2));

      this.availableWidth =  this.currentWidth  -= this.fullClosetValue;
      this.closets.splice(index, 1);
      
      this.validateBoxForm();
    }
    else
    {
    const index = this.closets.indexOf(closet)

    let boxCmSize = this.shortClosetValue;
    // this.price -= 2.45 * boxCmSize;
    // this.price = parseFloat(this.price.toFixed(2));

    this.availableWidth = this.currentWidth  -= this.shortClosetValue;
    this.closets.splice(index, 1);

    this.validateBoxForm();

    }
  }



//Adding boxes/tiles
  addTile = (boxSize)=>{
    this.calculateWidth(this.maxWidth);
    console.log('full closet value' ,this.fullClosetValue)
    if(this.currentWidth <= this.maxWidth){
      this.availableWidth = this.maxWidth - this.currentWidth;
      if(boxSize == 2 && this.availableWidth >= this.fullClosetValue){
        
        let boxCmSize = this.fullClosetValue;
        // this.price += 2.45 * boxCmSize;
        // this.price = parseFloat(this.price.toFixed(2));

        this.boxWidth = boxSize;
        this.currentWidth += this.fullClosetValue;
        this.availableWidth = this.maxWidth - this.currentWidth;
        const itemNew =  {index: 1 , cols: boxSize,boxWidthTest:`${100/this.numberOfBigBoxes}`+'%',widthInCm:this.fullClosetValue.toFixed(1)+'cm'}
        this.closets.push(itemNew)
        boxSize = 0;
        this.validateBoxForm();
      }
      else if(boxSize == 1 && this.availableWidth >= this.shortClosetValue){

        let boxCmSize = this.shortClosetValue;
        // this.price += 2.45 * boxCmSize;
        // this.price = parseFloat(this.price.toFixed(2));

        let numberOfSmallBoxes = this.numberOfBigBoxes*2;
        this.boxWidth = boxSize;
        this.currentWidth += this.shortClosetValue;
        this.availableWidth = this.maxWidth - this.currentWidth;
        const itemNew =  {index: 1 ,  cols: boxSize,boxWidthTest:`${100/numberOfSmallBoxes}`+'%',widthInCm:this.shortClosetValue.toFixed(1)+'cm'}
        this.closets.push(itemNew)
        boxSize = 0;

        this.validateBoxForm();
      }
      else{
        alert('Width size exceeds')
      }
    }
    this._sharedData.sendClosetLayout(this.closets);
    
  }

  validateBoxForm(){
    if(this.availableWidth < 30){
      this.boxForm.setValue({
        boxFull:'abc'
      });
      // Implementd in next step for now not dealing with price here
      // this._sharedData.updatePrice(this.price);
     
      this._sharedData.updatePrice(this.price.toFixed(2));
    }
    else{
      this.boxForm.setValue({
        boxFull:null
      })
    }
  }

  disableSideForm(){
    alert('disable fun is called')
      this.sharedFormLabels = {
        leftLabel:'result.leftLabel',
        rightLabel:"result.rightLabel",
        leftReadOnly:true,
        rightReadOnly:true,
        topReadOnly:true,
        bottomReadOnly:true,
        }
        this._sharedData.updateSharedFormLabels(this.sharedFormLabels)
    
    
  }

   //Calculating width
  //  calculateWidth(w){
  //   if(w >= 250){
  //    //for extraction of first digit
  //    var number = w;
  //    // convert number to a string, then extract the first digit
  //    var dig1 = String(number).charAt(0);
  //    // convert the first digit back to an integer
  //    var firstDigit = Number(dig1); 
  //     if(w/firstDigit < 11){
  //       this.numberOfBigBoxes = firstDigit;
  //       // this.shortIsDisable = true;
  //       this.fullClosetValue = w/firstDigit - 0.01;   //to "-0.01 to match the size "
  //       this.shortClosetValue = this.fullClosetValue/2;
  //     }
  //     else{
  //       firstDigit = firstDigit+.5;
  //       firstDigit = Number(firstDigit) //back to number
  //       this.numberOfBigBoxes = firstDigit;
  //       // this.shortIsDisable = true;
  //       this.fullClosetValue = w/firstDigit- 0.01;   //to "-0.01 to match the size "
  //       this.shortClosetValue = this.fullClosetValue/2;
  //     }

  //   }
    
  //   else{
  //     console.log('wrong input')

  //   }
  // }




   calculateWidth(w){
     console.log('width is calculating', w)
     if(w<100){
       //Do subtract 10 for left right 
       w = w - this.leftBar - this.rightBar ;
      //  extract the value for short closet
      this.numberOfBigBoxes = 1;
      this.shortIsDisable = true;
      // this.shortClosetValue = w/2;
       return this.fullClosetValue = w;
       
     }
     else if(w >= 100 && w < 200){
      w = w - this.leftBar - this.rightBar ;
       let tempShort = w/4;
       
       let tempFull = tempShort *2;
       this.shortClosetValue = tempShort;
       this.fullClosetValue = tempFull;
       this.numberOfBigBoxes = 2; //for Width set
      
      // this.shortIsDisable = false;
      
     }

     else if(w >= 200){
        //  removing side bar values/
        console.log('in calculation total width',w , this.leftBar, this.rightBar)
         w = w - this.leftBar - this.rightBar ;
        console.log('After calculation total width',w )
         //for extraction of first digit
         var number = w;
         // convert number to a string, then extract the first digit and second 
         var dig1 = String(number).charAt(0);
        //  Checking the values more than 350 if yes div with 350/3 
         var dig2 = String(number).charAt(1)+String(number).charAt(2);; 
         
         // convert the first digit back to an integer
         var firstDigit = Number(dig1); 
         var secondDigit = Number(dig2);
          if(secondDigit > 50){
            // Add 1 to first digit for working formula .. e.g 370/4 ... so first digit is 3+1 = 4 <= first dig is 4.
            firstDigit += 1;
            this.numberOfBigBoxes = firstDigit;
            // this.shortIsDisable = true;
            this.fullClosetValue = w/firstDigit;   //to "-0.01 to match the size "
            this.shortClosetValue = this.fullClosetValue/2;
          }
          else{
            firstDigit = firstDigit+.5;
            firstDigit = Number(firstDigit) //back to number
            this.numberOfBigBoxes = firstDigit;
            // this.shortIsDisable = true;
            this.fullClosetValue = w/firstDigit;   //to "-0.01 to match the size "
            this.shortClosetValue = this.fullClosetValue/2;
          }
    
        }
        
        else{
          console.log('wrong input')
    
        }



    //  else if(w >= 200 && w < 360)
    //  {
    //    w = w-10;
    //    let tempFull = w/3;
    //    let tempShort = tempFull/2;
    //    this.shortClosetValue = tempShort;
    //    this.fullClosetValue = tempFull;
    //    this.numberOfBigBoxes = 3; //For width
    //  }
    //  else if(w >=  360 && w < 460)
    //  {
    //    w = w-10;
    //    let tempFull = w/4;
    //    let tempShort = tempFull/2;
    //    this.shortClosetValue = tempShort;
    //    this.fullClosetValue = tempFull;
    //    this.numberOfBigBoxes = 4;
    //  }
    //  else if(w >=  460 && w < 560)
    //  {
    //    w = w-10;
    //    let tempFull = w/5;
    //    let tempShort = tempFull/2;
    //    this.shortClosetValue = tempShort;
    //    this.fullClosetValue = tempFull;
    //    this.numberOfBigBoxes = 5;
    //  }
    //  else{
    //    alert('Wrong input');

    //  }
   }
}
