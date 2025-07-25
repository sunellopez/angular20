import { Component, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonCardContent, IonLabel, IonNote, IonList, IonFab, IonFabButton, IonIcon, IonModal, IonButtons, IonButton, IonText } from '@ionic/angular/standalone';
import { ExpenseService } from '../service/expense/expense.service';
import { ExpenseFormComponent } from './expense-form/expense-form/expense-form.component';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonText, IonButton, IonButtons, ExpenseFormComponent, IonModal, IonIcon, IonFabButton, IonFab, IonList, IonNote, IonLabel, IonCardContent, IonItem, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class Tab1Page {
  private expenseService = inject(ExpenseService);
  protected isOpen = false;

  protected summary = signal<any>([]);

  constructor() {}

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary() {
    this.expenseService.getWeeklySummary().subscribe({
      next: (res: any) => {
        this.summary.set(res);
      },
      error(err: any) {
        console.log('Error:', err)
      },
    });
  }

  openNewExpenseModal() {
    this.isOpen = true;
  }

  handleDismiss(event: CustomEvent) {
    const data = event.detail.data;
    if (data?.refresh) {
      this.loadSummary();
    }
    this.isOpen = false;
  }
}