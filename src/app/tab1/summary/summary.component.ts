import { CurrencyPipe } from '@angular/common';
import { Component, input, OnInit, signal } from '@angular/core';
import { Summary } from '@interfaces';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel, IonNote, IonSkeletonText } from "@ionic/angular/standalone";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  standalone: true,
  imports: [CurrencyPipe, IonSkeletonText, IonNote, IonLabel, IonItem, IonList, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent]
})
export class SummaryComponent  implements OnInit {
  summary = input<Summary>({
    total: 0,
    start: '',
    end: '',
    count: 0
  });
  isLoadingSummary = signal<boolean>(false);
  
  constructor() { }

  ngOnInit() {}

}
