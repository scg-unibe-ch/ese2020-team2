import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Role } from '../models/role';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  loggedIn$: BehaviorSubject<boolean>;
  constructor(private authService: AuthService, public dialogRef: MatDialogRef<ModalComponent>) {
    this.loggedIn$ = authService.loggedIn$
  }

  ngOnInit(): void {
  }
  get isAdmin() {
    return this.authService.hasRole(Role.Admin);
  }

  actionFunction() {
    alert("I am a work in progress");
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
