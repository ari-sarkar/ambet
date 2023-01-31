import { PaymentComponent } from './../payment/payment.component';
import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-place-bet',
  templateUrl: './place-bet.page.html',
  styleUrls: ['./place-bet.page.scss'],
})
export class PlaceBetPage implements OnInit {
  digit: any = '';
  amount: any = '';
  myBetLists: any[] = [];
  constructor(
    private toastController: ToastController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  addBets() {
    if (this.amount >= 50) {
      this.myBetLists.push({ digit: this.digit, amount: this.amount });
      this.digit = '';
      this.amount = '';
    } else {
      this.presentToast('Minimum betting amount is Rs. 50');
    }
  }

  removeBet(index: number) {
    this.myBetLists.splice(index, 1);
    this.presentToast('Bet Deleted!');
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  async gotoPayment() {
    const modal = await this.modalCtrl.create({
      component: PaymentComponent,
      componentProps: { bettingList: this.myBetLists },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      //`Hello, ${data}!`;
    }
  }
}
