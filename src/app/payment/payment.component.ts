import { finalize } from 'rxjs';
import { LoaderService } from './../loader.service';
import { AmBetsService } from './../ambets.service';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @Input('bettingList') bettingList: any;
  totalAmount: number = 0;
  user: any
  no: any = '';
  gatewayValue: any;
  gateWayName = '';
  admin: any;
  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private router: Router,
    private amBetsService: AmBetsService,
    private loaderService: LoaderService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.getUserDetails();
    console.log(this.bettingList);
    if (this.bettingList) {
      this.bettingList.map((bet: { amount: number }) => {
        this.totalAmount = this.totalAmount + bet.amount;
      });
      this.admin = this.storage.get("admin");
      this.presentAlert();
    }
  }

  getUserDetails() {
    this.amBetsService.getUserByNo(0, 10, this.storage.get("phnNo")).subscribe(res => {
      this.storage.set('user', res.user[0]);
      this.user = res.user[0];
    },
      err => { console.log(err) })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: `<ol>
      <li>Send the Total Amount <b>Rs. ${this.totalAmount}</b> to <b>${this.admin.moneyNumber}</b></li>
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
      message: `We will update your wallet shortly. For any query contact us on <ion-icon name="logo-whatsapp"></ion-icon> ${this.admin.wpNumber}`,
      buttons: ['OK'],
      mode: 'ios',
    });

    await alert.present();
  }

  gateway(e: any) {
    this.gateWayName = e.target.value;
    this.no += e.target.value;
  }

  getInput(e: any) {
    this.no = e.target.value;
  }

  save() {
    if (!this.no || this.no.toString().length < 10) {
      this.presentToast('Please enter valid no');
    } else if (!this.gateWayName) {
      this.presentToast('Please select UPI gateway name');
    } else {
      //console.log(this.no);
      this.loaderService.showLoading('Sending request...')
      const user = this.user;
      const payload = {
        "user": user.id,
        "userName": user.name,
        "userNo": this.no,
        "amount": this.totalAmount,
        "balance": user.walletBalance,
        "type": "plus"
      }
      this.amBetsService.addMoney(payload)
        .pipe(finalize(() => this.loaderService.dismiss()))
        .subscribe(res => {
          if (res.status === "200") {
            const newBal = parseInt(user.walletBalance) + this.totalAmount;
            user.walletBalance = newBal;
            localStorage.setItem('user', JSON.stringify(user));
            this.showConfirm();
          }
        }, err => { console.log(err) })
    }

  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'top',
      color: 'dark'
    });
    await toast.present();
  }
}
