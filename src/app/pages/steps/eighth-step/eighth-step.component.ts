import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataSharingService } from 'src/app/shared/data-sharing.service';
import {PaymentService} from '../../../shared/payment/payment.service';
@Component({
  selector: 'app-eighth-step',
  templateUrl: './eighth-step.component.html',
  styleUrls: ['./eighth-step.component.scss']
})
export class EighthStepComponent implements OnInit, AfterViewInit {
 paymentDetailForm;
 price;
  constructor(private payment:PaymentService,
              private _sharedData:DataSharingService) { }
  @ViewChild('stepSeven', { read: ElementRef }) handleDesignElementRef: ElementRef
  
  ngOnInit(): void {
    this._sharedData._price$.subscribe(price =>{
      this.price = price
    })
    if(!this.price) {
      this.price = 3023.45;
    }
    this.paymentDetailForm = new FormGroup({
      firstName: new FormControl('' ,[(Validators.required)] ),
      lastName: new FormControl(''),
      email : new FormControl('' ,[(Validators.required)] ),
      phone : new FormControl('' ,[(Validators.required)] ),
      postCode : new FormControl('' ,[(Validators.required)] ),
      townShip : new FormControl('' ,[(Validators.required)] ),
      address : new FormControl('' ,[(Validators.required)] ),
      comment : new FormControl('' ,[(Validators.required)] ),
      deliveryMethod : new FormControl('' ,[(Validators.required)] ),
      onSpecificDay:  new FormControl('' ,[(Validators.required)] ),
      deliveryDate : new FormControl('' ,[(Validators.required)] ),
      price : new FormControl('',[(Validators.required)] )
    });
    
  }
  
  ngAfterViewInit() {
    setTimeout(() => {
      const colorCard = this.handleDesignElementRef.nativeElement.children[0].firstElementChild.childNodes[0].children[1];
      colorCard.style.display = 'none'
      // colorCard.style.color = 'red'
      console.log("ngAfterViewInit" );
    }, 0.5);
  
  }

onSubmit(){
  // console.table(this.paymentDetailForm.value)
  this.paymentDetailForm.patchValue({
    price:this.price
  })
  this.payment.creatPayment(this.paymentDetailForm.value).subscribe((result:any)=>{
    window.location.href = result.paymentUrl;
    console.log(result)
  },(err)=>{
    console.log(err)
  })
}

}
