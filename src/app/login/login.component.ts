import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { IonContent, IonInput, IonItem, IonButton, IonText, ToastController, IonFooter, IonToolbar, IonTitle, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInputPasswordToggle, LoadingController } from "@ionic/angular/standalone";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonLabel, IonTitle, IonToolbar, IonFooter, IonButton, IonItem, IonInput, IonContent, IonInputPasswordToggle]
})
export class LoginComponent  implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastController = inject(ToastController);
  private loadingCtrl = inject(LoadingController);

  username = signal('');
  password = signal('');
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor() { }

  ngOnInit() {}

  async onLogin() {
    if (!this.username() || !this.password()) {
      this.errorMessage = 'Por favor, ingrese un nombre de usuario y una contraseña.';
      this.showErrorToast(this.errorMessage);
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    loading.present();

    this.isLoading = true;

    this.authService.login(this.username(), this.password())
    .pipe(
      finalize(() => {
        this.isLoading = false;
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
        this.showErrorToast(err.error);
      }
    });
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

  onUsernameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.username.set(input.value);
  }

  onPasswordChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.password.set(input.value);
  }
}
