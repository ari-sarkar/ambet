import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @Input('bettingList') bettingList: any;
  totalAmount: number = 0;
  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    //console.log(this.bettingList);
    if (this.bettingList) {
      this.bettingList.map((bet: { amount: number }) => {
        this.totalAmount = this.totalAmount + bet.amount;
      });
      this.presentAlert();
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: `<ol>
      <li>Please send money from your registered mobile no only</li>
      <br>
      <li>Send the Total Amount <b>Rs. ${this.totalAmount}</b> to <b>7777777777</b></li>
      <br>
      <li>Send Money from Phone Pay,PAYTM and GPay Only</li>
      <br>
      <li>Once the Payment is Done Fill this Form and 'Click' on 'SUBMIT'</li>
    </ol>`,
      buttons: ['Cancel', 'OK'],
      mode: 'ios',
    });

    await alert.present();
  }

  async showConfirm() {
    this.cancel();
    this.router.navigateByUrl('/tabs/home');
    const alert = await this.alertController.create({
      header: 'Success',
      subHeader: 'Payment request sent.',
      message: `We will update your wallet shortly. For any query contact us on <ion-icon name="logo-whatsapp"></ion-icon> 7777777777`,
      buttons: ['OK'],
      mode: 'ios',
    });

    await alert.present();
  }
}
