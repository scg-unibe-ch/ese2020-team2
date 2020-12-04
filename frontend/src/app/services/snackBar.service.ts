import {Injectable, NgZone} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable({
  providedIn: "root"
})
export class SnackBarService {


  constructor(public snackBar: MatSnackBar,
              private zone: NgZone) {}

  open(message: string, action: string, duration: number, typ: string) {
    this.zone.run(() => {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top',
      panelClass: [typ]
    })})
  }

}
