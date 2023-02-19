import { AmBetsService } from './../ambets.service';
import { WithdrawMoneyComponent } from './../withdraw-money/withdraw-money.component';
import {
  ModalController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentComponent } from '../payment/payment.component';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';

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
  user: any;
  gameList: any = [];
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private route: Router,
    private amBetsService: AmBetsService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
  ) {
    this.getUserDetails();
    this.getAllGames();
  }

  getUserDetails() {
    this.amBetsService.getUserByNo(0, 10, this.storage.get("phnNo")).subscribe(res => {
      this.storage.set('user', res.user[0]);
      this.user = res.user[0];
    },
      err => { console.log(err) })
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
    if (data.values[0] >= 5) {
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
      componentProps: { bettingList: [{ amount: parseInt(this.topUpAmount), type: "plus" }] },
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

  getAllGames() {
    this.amBetsService.getAllGames().subscribe(res => {
      if (res.data.length)
        res.data.map((e: any, i: number) => {
          if (!e.name) {
            res.data.splice(i, 1);
          }
        })
      this.gameList = res.data;
      console.log(res)
    }, err => console.log(err))
  }

  navigate(bet: any) {
    console.log(bet);
    this.storage.set('gameId', bet.id);
    this.storage.set('gameName', bet.name);
    this.route.navigateByUrl("/betting-times");
  }
}
