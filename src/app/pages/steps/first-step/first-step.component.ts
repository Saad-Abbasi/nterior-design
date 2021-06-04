import { Component, OnInit } from '@angular/core';
import {DataSharingService} from '../../../shared/data-sharing.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {
  durationInSeconds = 5;
  designImage;
  constructor(private _dataSharingService: DataSharingService,
              private _router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // this.designImage = localStorage.getItem('_imageUrl');
    
    // setTimeout(() => {
    //   if(this.designImage){
    //     this.selectedDesign(this.designImage)
        
    //   }
    // }, 0);
  }

  
  selectedDesign(imageUrl){
    if(imageUrl =='1.jpg'||imageUrl =='3.jpg'||imageUrl =='8.jpg'||imageUrl =='9.jpg')
    {
      this._dataSharingService.updateSlopeStatus('true')
    }
    else{
      this._dataSharingService.updateSlopeStatus('false')
    }
    if(!this.designImage){
      this.openSnackBar();
    }
    
    
    this._dataSharingService.sendImage(imageUrl);
    this._dataSharingService._imageUrl$.subscribe((result)=>{
      if(result){
       
      }
    })
  }

  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: this.durationInSeconds * 500,
      horizontalPosition:'center',
      verticalPosition: 'bottom',
      panelClass: ['mat-toolbar', 'mat-accent']
    });
  }
}

@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar-component-example-snack.html',
  styles: [`
    .snackbar {
      color: white;
      
    }
    ::ng-deep .black-snackbar {
      background: #2196F3;
      
    }
  `],
})
export class PizzaPartyComponent {}