import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { Summary } from '@interfaces';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel, IonNote, IonSkeletonText, IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  standalone: true,
  imports: [IonIcon, DatePipe, CurrencyPipe, IonSkeletonText, IonNote, IonLabel, IonItem, IonList, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard]
})
export class SummaryComponent  implements OnInit {
  summary = input<Summary>({
    total: 0,
    start: '',
    end: '',
    count: 0
  });
  isLoadingSummary = input<boolean>(false);
  
  constructor() { }

  ngOnInit() {}

}
