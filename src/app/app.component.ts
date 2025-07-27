import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { add, addOutline, alertCircle, bookmarkOutline, cartOutline, checkmarkCircle, close, closeOutline, createOutline, exitOutline, homeOutline, logOutOutline, notificationsOutline, personCircleOutline, personOutline, rocketOutline, settingsOutline, syncOutline, walletOutline } from 'ionicons/icons';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
     addIcons({ close, personOutline, settingsOutline, rocketOutline, syncOutline, bookmarkOutline, createOutline, personCircleOutline, logOutOutline, exitOutline, notificationsOutline, homeOutline, addOutline, closeOutline, add, alertCircle, checkmarkCircle, cartOutline, walletOutline});
  }
}
