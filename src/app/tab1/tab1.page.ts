import { Component, inject, signal, WritableSignal } from '@angular/core';
import { IonThumbnail, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonNote, IonList, IonFab, IonFabButton, IonIcon, IonModal, IonButtons, IonButton, IonCol, IonGrid, IonRow, IonInfiniteScroll, IonInfiniteScrollContent, IonSkeletonText, IonListHeader } from '@ionic/angular/standalone';
import { ExpenseService } from '../service/expense/expense.service';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { finalize } from 'rxjs';
import { Expense, Summary } from '@interfaces';
import { SummaryComponent } from './summary/summary.component';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonListHeader, SummaryComponent, DatePipe, IonThumbnail, IonSkeletonText, CurrencyPipe, IonInfiniteScrollContent, IonInfiniteScroll, IonRow, IonGrid, IonCol, IonButton, IonButtons, ExpenseFormComponent, IonModal, IonIcon, IonFabButton, IonFab, IonList, IonNote, IonLabel, IonItem, IonHeader, IonToolbar, IonTitle, IonContent],
  standalone: true
})
export class Tab1Page {
  private expenseService = inject(ExpenseService);
  
  protected isOpen = false;
  protected summary = signal<Summary>({
    total: 0,
    start: '',
    end: '',
    count: 0
  });
  expenses: Expense[] = [];
  currentPage = 1;
  hasMore = true;
  isLoading = false;
  isLoadingSummary: WritableSignal<boolean> = signal(false);

  constructor() {}

  ionViewWillEnter(): void {
    this.resetState();
    this.loadExpenses();
    this.loadSummary();
  }

  loadSummary() {
    this.isLoadingSummary.set(true);

    this.expenseService.getWeeklySummary()
    .pipe(
      finalize(() => {
        this.isLoadingSummary.set(false);
      })
    )
    .subscribe({
      next: (res: any) => {
        this.summary.set(res.data);
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
      this.currentPage = 1;
      this.expenses = [];
      this.hasMore = true;
      this.loadExpenses();
    }
    this.isOpen = false;
  }

  loadExpenses(event?: any) {
    if (!event) {
      this.isLoading = true;
    }

    this.expenseService.getExpenses(this.currentPage)
    .pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe({
      next: (res: any) => {
        this.expenses = [...this.expenses, ...res.data];

        this.hasMore = res.current_page < res.last_page;

        this.currentPage++;

        if (event) {
          event.target.complete();
        }
      },
      error(err: any) {
        console.log('Error:', err);
        if (event) {
          event.target.complete();
        }
      },
    });
  }

  resetState() {
    this.currentPage = 1;
    this.expenses = [];
  }
}