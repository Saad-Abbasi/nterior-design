import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/shared/data-sharing.service';

@Component({
  selector: 'app-choose-closet-small',
  templateUrl: './choose-closet-small.component.html',
  styleUrls: ['./choose-closet-small.component.scss']
})
export class ChooseClosetSmallComponent implements OnInit {
  cabnetHeight2;
  isDisable = false

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<ChooseClosetSmallComponent>) { }

  ngOnInit(): void {
    this.cabnetHeight2 = this.data.height2;
   
    
    if(this.cabnetHeight2 && this.cabnetHeight2 < 140 ){
      this.isDisable = false
    }else{
      this.isDisable = true
    }
  }

}
