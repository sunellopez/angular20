import { Component, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonCardContent, IonLabel, IonNote, IonList, IonFab, IonFabButton, IonFabList, IonIcon, ModalController } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ExpenseService } from '../service/expense/expense.service';
import { ExpenseFormComponent } from './expense-form/expense-form/expense-form.component';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonIcon, IonFabButton, IonFab, IonList, IonNote, IonLabel, IonCardContent, IonItem, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class Tab1Page {
  private expenseService = inject(ExpenseService);
  private modalCtrl = inject(ModalController);

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

  async openNewExpenseModal() {
    const modal = await this.modalCtrl.create({
      component: ExpenseFormComponent,
      initialBreakpoint: 0.5, 
      breakpoints: [0, 0.25, 0.5, 0.75]
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.refresh) {
      this.loadSummary();
    }
  }
}
