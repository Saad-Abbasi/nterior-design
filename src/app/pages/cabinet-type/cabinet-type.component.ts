import {  Component, ElementRef, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';
import { DataSharingService } from 'src/app/shared/data-sharing.service';
import {SecondStepComponent} from '../steps/second-step/second-step.component';
import {ThirdStepComponent} from '../steps/third-step/third-step.component';
import {FourthStepComponent} from '../steps/fourth-step/fourth-step.component';
import {FifthStepComponent} from '../steps/fifth-step/fifth-step.component';
import { SixthStepComponent } from '../steps/sixth-step/sixth-step.component';
import { SeventhStepComponent } from '../steps/seventh-step/seventh-step.component';

@Component({
  selector: 'app-cabinet-type',
  templateUrl: './cabinet-type.component.html',
  styleUrls: ['./cabinet-type.component.scss']
})
export class CabinetTypeComponent implements OnInit {
  
  isLinear = false;
  isDesignSelected = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  selectedIndex: number = 0;
  designImage;
  isVisitedStep2 = false;
  isHandle = false;

  constructor(private _formBuilder: FormBuilder,
              private _dataService:DataSharingService,
              private _cdRef:ChangeDetectorRef) {
    
  }

              
@ViewChild('stepper') private myStepper: MatStepper;
@ViewChild('step1', {static: false}) step1: ElementRef;
@ViewChild(SecondStepComponent) stepTwoComponent: SecondStepComponent;
@ViewChild(ThirdStepComponent) thirdStepComponnet: ThirdStepComponent;
@ViewChild(FourthStepComponent) fourthStepComponnet: FourthStepComponent;
@ViewChild(FifthStepComponent) fifthStepComponnet: FifthStepComponent;
@ViewChild(SixthStepComponent) sixthStepComponent: SixthStepComponent;
@ViewChild(SeventhStepComponent) seventhStepComponent: SeventhStepComponent;
   
  ngOnInit() {
    
    
    this._dataService._imageUrl$.subscribe((result)=>{
      this.designImage = result;
      
      this.isDesignSelected = true ;
      
     
      
      setTimeout(() => {
        // if(this.goForward){
        //   this.goForward(this.myStepper)
        // }
        this.goForward(this.myStepper)
        
      }, 10);
     
      
    },(err)=>{
      console.log(err)
    });
    
    if(this.updateImage && this.designImage){
      this.updateImage(this.designImage)
    }

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
      
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    
  this._dataService._handleStatus$.subscribe((result:boolean)=>{
    if(result == true){
      this.isHandle = true;
    }
    else{
      this.isHandle = false
    }
  })
    
    
}
updateImage( designImage){
  this._dataService.sendImage(designImage);
  this._dataService.sendImage(designImage);
  this._dataService.sendImage(designImage);
  this.updateImage = undefined;
}


setIndex(event) {
  
  this.selectedIndex = event.selectedIndex;
  console.log(event)
  if(this.selectedIndex == 0  && event.selectedStep.interacted == true  ){
    
    location.reload()
  }
  else if(this.selectedIndex == 1  && event.selectedStep.interacted == true  ){
    
    location.reload()
 }
 else if(this.selectedIndex == 2  && event.selectedStep.interacted == true  ){
    
  location.reload()
}
 else if(this.selectedIndex == 2){
  this._dataService.disableSharedForm(true);
 }
 else{
  
 }
 

}



goForward(stepper: MatStepper){
  
  stepper.next();
} 



ngAfterContentChecked() {
  this._cdRef.detectChanges();
}
get frmStepTwo() {
  return this.stepTwoComponent ? this.stepTwoComponent.cabnetValuesForm: null;
}

get isAllFieldsAdded(){
  return this.thirdStepComponnet? this.thirdStepComponnet.boxForm:null;
}

get isAllDesignSelected(){
  return this.fourthStepComponnet? this.fourthStepComponnet.boxForm:null;
}


get isColorSelected(){
  return this.fifthStepComponnet? this.fifthStepComponnet.boxForm:null;
}

get isOuterColorSelected(){
  return this.sixthStepComponent? this.sixthStepComponent.boxForm:null;
}

get isHandleAdded(){
  return this.seventhStepComponent? this.seventhStepComponent.boxForm:null;
}


}
