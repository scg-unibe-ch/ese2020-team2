import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';
import { CurrentUser } from 'src/app/services/current-user';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css']
})
export class NotificationModalComponent implements OnInit {
  listOfNotification$: any;
  listOfNot: any;

  constructor(public dialogRef: MatDialogRef<ModalComponent>,private currentUser:CurrentUser) { }

  ngOnInit(): void {
    this.getNoftification()
    this.listOfNotification$.subscribe(list => this.listOfNot=list)
  }
  
  actionFunction() {
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

  getNoftification(){
    this.listOfNotification$ = this.currentUser.getNotification()
  }

}
