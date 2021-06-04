import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private _cabinetDataSource = new Subject<string>();
  cabinetData$ = this._cabinetDataSource.asObservable();

  private _imageDataSource = new Subject<string>();
  _imageUrl$ = this._imageDataSource.asObservable();
  
  private _closetLayoutDataSource = new Subject<string>();
  _closetLayout$ = this._closetLayoutDataSource.asObservable();

  private _colorImageDataSource = new Subject<string>();
  _colorImages$ = this._colorImageDataSource.asObservable();

  private _priceDataSource = new Subject<number>();
  _price$ = this._priceDataSource.asObservable();

  private _slopeStatus = new Subject<string>();
  _slope$ = this._slopeStatus.asObservable();

  private _slopeDirection = new Subject<string>();
  _slopeDirection$ = this._slopeDirection.asObservable();

  private _borderSlope = new Subject<string>();
  _borderSLope$ = this._borderSlope.asObservable();

  private _sharedForm = new Subject<string>();
  _sharedForm$ = this._sharedForm.asObservable();

  private _sharedFormDisable = new Subject<boolean>();
  _sharedFormDisable$ = this._sharedFormDisable.asObservable();

  private _shareOuterImage = new Subject<string>();
  _shareOuterImage$ = this._shareOuterImage.asObservable();

  private _sharedFormLabels = new Subject<string>();
  _sharedFormLabels$ = this._sharedFormLabels.asObservable();

  private _doorFlip = new Subject<string>();
  _doorFlip$ = this._doorFlip.asObservable();

  private _handleStatus = new Subject<boolean>();
  _handleStatus$ = this._handleStatus.asObservable();

  constructor() { }

  sendData(data:any){
       this._cabinetDataSource.next(data);
  } 

  sendImage(imageUrl: string){
    this._imageDataSource.next(imageUrl);
  }

  sendClosetLayout(layoutArray:any){
    this._closetLayoutDataSource.next(layoutArray);
  }

  sendColorImage(colorImageData:any){
    this._colorImageDataSource.next(colorImageData);
  }

  updatePrice(price:any){
    this._priceDataSource.next(price);
  }
  updateSlopeStatus(isSlope:any){
    this._slopeStatus.next(isSlope);
  }

  updateSlopeDirection(slopeDirection:any){
    this._slopeDirection.next(slopeDirection);
  }
  
  updateBorderSlope(borderSlope:any){
    this._borderSlope.next(borderSlope);
  }

  updateSharedForm(sharedFormData:any){
    this._sharedForm.next(sharedFormData);
  }
 
  disableSharedForm(isDisable:boolean){
    this._sharedFormDisable.next(isDisable)
  }

  sendOuterImage(outerColorImg:any){
    this._shareOuterImage.next(outerColorImg);
  }

  updateSharedFormLabels(labels:any){
    this._sharedFormLabels.next(labels);
  }

  updatDoorFlip(scaleX:any){
    this._doorFlip.next(scaleX);
  }

  updateHandleStatus(handleAdd){
    this._handleStatus.next(handleAdd);
  }

}
