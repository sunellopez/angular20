import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { add, addOutline, alertCircle, bookmarkOutline, calendarOutline, cartOutline, cashOutline, checkmarkCircle, close, closeOutline, createOutline, exitOutline, homeOutline, listOutline, logoUsd, logOutOutline, notificationsOutline, personCircleOutline, personOutline, pieChartOutline, rocketOutline, settingsOutline, syncOutline, walletOutline, mailOutline, lockClosed, mail, person } from 'ionicons/icons';
import { NetworkService } from './service/network/network.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private network = inject(NetworkService);
  
  constructor() {
    addIcons({ close, personOutline, settingsOutline, rocketOutline, syncOutline, bookmarkOutline, createOutline, personCircleOutline, logOutOutline, exitOutline, notificationsOutline, homeOutline, addOutline, closeOutline, add, alertCircle, checkmarkCircle, cartOutline, walletOutline, pieChartOutline, cashOutline, listOutline, logoUsd, calendarOutline, mailOutline, lockClosed, mail, person });
  }
    
  ngOnInit() {
    this.network.initNetworkListener();
  }
}