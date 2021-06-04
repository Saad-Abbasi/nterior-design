import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-color-design',
  templateUrl: './color-design.component.html',
  styleUrls: ['./color-design.component.scss']
})
export class ColorDesignComponent implements OnInit {
 imageUrl: string;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<ColorDesignComponent>) { }

  ngOnInit(): void {
    this.imageUrl = this.data.image;
    console.log('data recived',this.data);
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
