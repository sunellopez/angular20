import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserResponse } from '@interfaces';
import { IonItem, IonInput, IonIcon, IonButton, ToastController, LoadingController } from "@ionic/angular/standalone";
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonItem, IonInput, ReactiveFormsModule]
})
export class EditProfileFormComponent  implements OnInit {
  private fb = inject(FormBuilder);
  private toastController = inject(ToastController);
  private loadingCtrl = inject(LoadingController);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  profileForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor() { }

  ngOnInit() {
    this.getUserInfo()
  }

  async getUserInfo() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    loading.present();

    this.userService.getUserInfo()
    .pipe(
      finalize(() => {
        loading.dismiss();
      })
    )
    .subscribe({
      next: (res: UserResponse) => {
        this.profileForm.patchValue({
          name: res.data.name,
          email: res.data.email
        });
      }
    })
  }

  async save() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    loading.present();

    const { name, email } = this.profileForm.value as { name: string; email: string };

    this.userService.updateUserInfo(name, email)
    .pipe(
      finalize(() => {
        loading.dismiss();
      })
    )
    .subscribe({
      next: (res: UserResponse) => {
        this.authService.setSession(res.data);
        this.presentToast(res.message, 'success', 'checkmark-circle');
      },
      error: (err: any) => {
        this.presentToast(err.error.message, 'danger', 'alert-circle');
      }
    })
  }

  

  async presentToast(msg?: string, color?: string, icon?: string) {
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