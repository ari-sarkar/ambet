import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loading: any
  constructor(public loadingCtrl: LoadingController) { }

  async showLoading(msg: string) {
    this.loading = await this.loadingCtrl.create({
      message: msg,
    });

    this.loading.present();
  }

  async dismiss() {
    if (this.loading)
      await this.loading.dismiss()
  }
}
