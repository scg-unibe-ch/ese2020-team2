import { Injectable, NgZone } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable({
  providedIn: "root"
})
export class SnackBarService {


  constructor(public snackBar: MatSnackBar,
    private zone: NgZone) { }

/**
 * Displays a message to the user
 * @param message to display to the user
 * @param action to do if the user wants to react
 * @param duration of the displaying of the message
 * @param typ of message
 */
  open(message: string, action: string, duration: number, typ: string) {
    this.zone.run(() => {
      this.snackBar.open(message, action, {
        duration: duration,
        verticalPosition: 'top',
        panelClass: [typ]
      })
    })
  }

}
