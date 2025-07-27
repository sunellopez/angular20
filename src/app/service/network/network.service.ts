import { Injectable, WritableSignal, signal, computed, effect } from '@angular/core';
import { Network } from '@capacitor/network';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private connectionStatus: WritableSignal<boolean> = signal(true);

  readonly isOffline = computed(() => !this.connectionStatus());

  constructor(private toastCtrl: ToastController) {}

  async initNetworkListener() {
    const status = await Network.getStatus();
    this.connectionStatus.set(status.connected);

    Network.addListener('networkStatusChange', (status) => {
      const wasConnected = this.connectionStatus();
      this.connectionStatus.set(status.connected);

      if (wasConnected && !status.connected) {
        this.showOfflineToast();
      } else if (!wasConnected && status.connected) {
        this.showOnlineToast();
      }
    });
  }

  // Útil para otras partes de la app
  get isOnlineSignal() {
    return this.connectionStatus;
  }

  async showOfflineToast() {
    const toast = await this.toastCtrl.create({
      message: 'Sin conexión. Algunas funciones no estarán disponibles.',
      duration: 3000,
      color: 'danger',
    });
    await toast.present();
  }

  async showOnlineToast() {
    const toast = await this.toastCtrl.create({
      message: '¡Conexión restablecida!',
      duration: 2000,
      color: 'success',
    });
    await toast.present();
  }
}