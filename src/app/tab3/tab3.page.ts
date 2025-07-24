import { Component, computed, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonAvatar, IonLabel, IonNote, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonIcon, IonChip, IonList, AlertController, ToastController, LoadingController, IonImg } from '@ionic/angular/standalone';
import { UserService } from '../service/user/user.service';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonImg, IonList, IonChip, IonIcon, IonInput, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonText, IonNote, IonLabel, IonAvatar, IonItem, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class Tab3Page {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);
  private loadingCtrl = inject(LoadingController);
  private router = inject(Router);
  
  protected user = computed(() => {
    const user = this.userService.getUserSession();
    return user ? JSON.parse(user) : null;
  });

  constructor() {}

  ngOnInit(): void {
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: 'Esto te desconectará de tu cuenta.',
      buttons: [
        {
          text: 'Confirmar',
          role: 'destructive',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Cargando...',
            });

            loading.present();
            this.authService.logout()
            .pipe(
              finalize(() => {
                loading.dismiss();
              })
            )
            .subscribe({
              next: async (res: any) => {
                if (res.success) {
                  this.authService.setAuthToken('');
                  this.authService.setSession(null);
                  this.showSuccessToast(res.message);
                  this.router.navigate(['/login']);
                }
              },
              error: async (err: any) => {
                this.showErrorToast(err.error);
              }
            });
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        }
      ],
    });

    await alert.present();
  }

  private async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message || 'Error al cerrar sesión',
      duration: 2000,
      color: 'danger',
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

  private async showSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success',
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
