import { WithdrawMoneyComponent } from './../withdraw-money/withdraw-money.component';
import {
  ModalController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  betList: any = [
    { name: 'Kolkata FataFat', imgUrl: '../../assets/cards.jpg' },
    // { name: 'Bombay FataFat', imgUrl: '../../assets/cards2.jpg' },
  ];
  topUpAmount: any;
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    //this.router.url;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Please enter Amount',
      buttons: ['OK'],
      inputs: [
        {
          placeholder: 'Amount in rupees',
          type: 'number',
        },
      ],
    });

    await alert.present();
    const { data } = await alert.onDidDismiss();
    if (data.values[0] >= 50) {
      this.topUpAmount = data.values[0];
      //console.log(this.topUpAmount);
      this.gotoPayment();
    } else {
      this.presentToast();
    }
  }

  async gotoPayment() {
    const modal = await this.modalCtrl.create({
      component: PaymentComponent,
      componentProps: { bettingList: [{ amount: parseInt(this.topUpAmount) }] },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      //`Hello, ${data}!`;
    }
  }

  async gotoWithdraw() {
    const modal = await this.modalCtrl.create({
      component: WithdrawMoneyComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      //`Hello, ${data}!`;
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Minimum payment amount is Rs. 50',
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }
}
