import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { bookmarkOutline, close, createOutline, exitOutline, logOutOutline, personCircleOutline, personOutline, rocketOutline, settingsOutline, syncOutline } from 'ionicons/icons';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
     addIcons({ close, personOutline, settingsOutline, rocketOutline, syncOutline, bookmarkOutline, createOutline, personCircleOutline, logOutOutline, exitOutline});
  }
}
