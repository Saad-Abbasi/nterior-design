import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-choose-closet',
  templateUrl: './choose-closet.component.html',
  styleUrls: ['./choose-closet.component.scss']
})
export class ChooseClosetComponent implements OnInit {
  cabnetHeight2;
  isDisable = false;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<ChooseClosetComponent>) { }

  ngOnInit(): void {
    this.cabnetHeight2 = this.data.height2;
   
    
    if(this.cabnetHeight2 && this.cabnetHeight2 < 140 ){
      this.isDisable = false
    }else{
      this.isDisable = true
    }
  }

}
