import { Component, inject, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonContent, IonItem, IonLabel, IonInput, IonDatetime, IonTextarea, IonList, IonModal, IonDatetimeButton, ModalController, ToastController, LoadingController } from "@ionic/angular/standalone";
import { finalize } from 'rxjs';
import { ExpenseService } from 'src/app/service/expense/expense.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
  imports: [IonDatetimeButton, IonModal, IonList, IonTextarea, ReactiveFormsModule, IonDatetime, IonInput, IonLabel, IonItem, IonContent, IonButton]
})
export class ExpenseFormComponent  implements OnInit {
  private fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController)
  private expenseService = inject(ExpenseService);
  private toastController = inject(ToastController);
  private loadingCtrl = inject(LoadingController);
  protected expand = output();

  form = this.fb.group({
    description: ['', Validators.required],
    amount: ['', [Validators.required, Validators.min(0.01)]],
    date: [new Date().toISOString().substring(0, 10), Validators.required],
  });

  constructor() { }

  ngOnInit() {}

  async save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const expense = this.form.value;
    
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    loading.present();

    this.expenseService.add(expense)
    .pipe(
      finalize(() => {
        loading.dismiss();
      })
    )
    .subscribe({
      next: (res: any) => {
        this.modalCtrl.dismiss({ refresh: true });
        this.presentToast(res.message, 'success', 'checkmark-circle');
      },
      error: (err: any) => {
        this.presentToast(err.error.message, 'danger', 'alert-circle');
      }
    })
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async presentToast(msg: string, color: string, icon: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'top',
      color: color,
      icon: icon
    });

    await toast.present();
  }
}