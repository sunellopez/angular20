import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { IonContent, IonInput, IonItem, IonButton, IonText, ToastController } from "@ionic/angular/standalone";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonButton, IonItem, IonInput, IonContent]
})
export class LoginComponent  implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastController = inject(ToastController);

  username = signal('');
  password = signal('');
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor() { }

  ngOnInit() {}

  onLogin() {
    if (!this.username() || !this.password()) {
      this.errorMessage = 'Por favor, ingrese un nombre de usuario y una contraseña.';
      this.showErrorToast(this.errorMessage);
      return;
    }

    this.isLoading = true;

    this.authService.login(this.username(), this.password())
    .pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe({
      next: (res) => {
        this.authService.setAuthToken(res.token);
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
