import { finalize } from 'rxjs';
import { AmBetsService } from './../ambets.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-withdraw-money',
  templateUrl: './withdraw-money.component.html',
  styleUrls: ['./withdraw-money.component.scss'],
})
export class WithdrawMoneyComponent implements OnInit {
  @Input('bettingList') bettingList: any;
  totalAmount: number = 0;
  user: any;
  amount: any;
  no: any;
  gty: any;
  enableBtn: boolean = false;
  toast: any;
  gateWayName = '';
  admin: any
  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private amBetsService: AmBetsService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private toastController: ToastController,
    private loaderService: LoaderService
  ) {
    this.getUserDetails();
  }

  ngOnInit() {
    //console.log(this.bettingList);
    this.admin = this.storage.get("admin");
    if (this.bettingList) {
      this.bettingList.map((bet: { amount: number }) => {
        this.totalAmount = this.totalAmount + bet.amount;
      });
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
      <li>Send Money from Phone Pay and GPay Only</li>
      <br>
      <li>Once the Payment is Done Fill this Form and 'Click' on 'SUBMIT'</li>
    </ol>`,
      buttons: ['Cancel', 'OK'],
      mode: 'ios',
    });

    await alert.present();
  }

  async showConfirm() {
    const alert = await this.alertController.create({
      header: 'Success',
      subHeader: 'Payment request sent.',
      message: `We will update your wallet shortly. For any query contact us on <ion-icon name="logo-whatsapp"></ion-icon> {{admin.wpNumber}}`,
      buttons: ['OK'],
      mode: 'ios',
    });

    await alert.present();
  }

  async amtChnage(e: any) {
    this.amount = e.target.value;
  }
  noChange(e: any) {
    this.no = e.target.value;
  }
  gChnage(e: any) {
    this.gateWayName = e.target.value;
    this.no += e.target.value;
    this.enableBtn = true
  }

  async save() {
    if (this.amount > parseInt(this.user.walletBalance)) {
      this.presentToast("Insufficient balance", 'dark', 'top');
    } else if (!this.gateWayName) {
      this.presentToast("Enter UPI gateway name", 'dark', 'top');
    } else if (!this.no || this.no.toString().length < 10) {
      this.presentToast("Please enter valid no", 'dark', 'top');
    } else if (this.amount < 50) {
      this.presentToast("Amount can't be less than 50", 'dark', 'top');
    }
    else {
      //console.log(this.no);
      const loading = await this.loaderService.loadingCtrl.create({
        message: 'Sending request...',
      });
      await loading.present();
      const user = this.user;
      const payload = {
        "user": user.id,
        "userName": user.name,
        "userNo": this.no,
        "amount": this.amount,
        "balance": user.walletBalance,
        "type": "minus"
      }
      this.amBetsService.addMoney(payload)
        .pipe(finalize(async () => await loading.dismiss()))
        .subscribe(res => {
          if (res.status === "200") {
            const newBal = parseInt(user.walletBalance) + this.totalAmount;
            user.walletBalance = newBal;
            localStorage.setItem('user', JSON.stringify(user));
            setTimeout(() => {
              this.cancel();
              this.showConfirm();
            }, 500);
          }
        }, err => { console.log(err) })
    }
  }

  async presentToast(msg: string, clr: string, position: 'top' | 'middle' | 'bottom') {
    this.toast = await this.toastController.create({
      message: msg,
      position: position,
      color: clr,
      duration: 1500
    });

    await this.toast.present();
  }
}
