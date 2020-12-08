import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modalimg',
  templateUrl: './modalimg.component.html',
  styleUrls: ['./modalimg.component.css']
})
export class ModalimgComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalimgComponent>) { }

  ngOnInit(): void {
  }


  actionFunction() {
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }
}


