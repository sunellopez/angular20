import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { IonContent, IonInput, IonButton, ToastController, IonFooter, IonToolbar, IonTitle, IonInputPasswordToggle, LoadingController, IonHeader } from "@ionic/angular/standalone";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonHeader, IonTitle, IonToolbar, IonFooter, IonButton, IonInput, IonContent, IonInputPasswordToggle, ReactiveFormsModule]
})
export class LoginComponent  implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastController = inject(ToastController);
  private loadingCtrl = inject(LoadingController);
  
  form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\d]).+$')]]
  });

  errorMessage: string = '';

  constructor() { 
    effect(() => {
      if (this.authService.isAuthenticated()) {
        this.router.navigate(['/tabs']);
      }
    });
  }

  ngOnInit() { }

  async onLogin() {
    if (this.form.invalid) return;
    
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    loading.present();

    const userData = this.form.value;

    this.authService.login(userData)
    .pipe(
      finalize(() => {
        loading.dismiss();
      })
    )
    .subscribe({
      next: (res) => {
        this.authService.setAuthToken(res.token);
        this.authService.setSession(res.user);
        this.router.navigate(['/tabs']);
      },
      error: (err) => {
        this.showErrorToast(err.error.message);
      }
    });
  }

  async onSignUp() {
    this.router.navigate(['/sign-up']);
  }

  async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger',  // Color rojo para indicar error
      position: 'top',
      buttons: [
        {
          icon: 'close',
          htmlAttributes: {
            'aria-label': 'close',
          },
        },
      ],
    });

    toast.present();
  }
}