import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonInput, IonInputPasswordToggle, IonButton, ModalController, ToastController, LoadingController } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/service/auth/auth.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInputPasswordToggle, ReactiveFormsModule]
})
export class SignUpPage implements OnInit {
  private fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController)
  private authService = inject(AuthService);
  private toastController = inject(ToastController);
  private loadingCtrl = inject(LoadingController);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\d]).+$')]]
  });

  constructor() { }

  ngOnInit() {
  }

  async save() {
    if (this.form.invalid) return;
    
    const userData = this.form.value;
    
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    loading.present();

    this.authService.signUp(userData)
    .pipe(
      finalize(() => {
        loading.dismiss();
      })
    )
    .subscribe({
      next: (res: any) => {
        this.form.reset();
        this.modalCtrl.dismiss({ refresh: true });
        this.presentToast(res.message, 'success', 'checkmark-circle');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.presentToast(err.error.message, 'danger', 'alert-circle');
      }
    })
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