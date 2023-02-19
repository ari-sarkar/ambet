import { Router } from '@angular/router';
import { PaymentComponent } from './../payment/payment.component';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AmBetsService } from '../ambets.service';
import { setInterval } from 'timers';

@Component({
  selector: 'app-place-bet',
  templateUrl: './place-bet.page.html',
  styleUrls: ['./place-bet.page.scss'],
})
export class PlaceBetPage implements OnInit {
  digit: any = '';
  amount: any = '';
  myBetLists: any[] = [];
  placeBetTitle: any = {
    gameName: '',
    slotName: '',
    endTime: '',
    patti: 0,
  };
  user: any;
  currentHour: any;
  currentMinute: any;
  constructor(
    private toastController: ToastController,
    private modalCtrl: ModalController,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private amBetsService: AmBetsService,
    private route: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.getUserDetails();
    //const pmSplit = splitArray[1].split('pm');
    //console.log(hour, amSplit)
    this.route.events.subscribe(res => {
      //console.log(res);
      this.digit = '';
      this.amount = '';
      this.myBetLists = [];
    })
  }

  // timeCalculation() {
  //   const id = setInterval(() => {
  //     let d = new Date();
  //     this.currentHour = d.getHours();
  //     this.currentMinute = d.getMinutes();
  //     const endTime = this.storage.get('endTime');
  //     const splitArray = endTime.split(':');
  //     const hour = splitArray[0];
  //     const minSplit = splitArray[1].slice(0, 2);
  //     const resultHour = this.currentHour - parseInt(hour);
  //     console.log(resultHour, this.currentHour);
  //   }, 1000);
  //   setTimeout(() => {
  //     clearInterval(id);
  //   }, 5000)
  // }

  ngOnInit() {
    console.log('hi');
    this.placeBetTitle.gameName = this.storage.get('gameName');
    this.placeBetTitle.slotName = this.storage.get('slotName');
    this.placeBetTitle.endTime = this.storage.get('endTime');
    this.placeBetTitle.patti = this.storage.get('patti') === 'single' ? 1 : 3;
    this.changeDetectorRef.detectChanges();
  }

  getUserDetails() {
    this.amBetsService.getUserByNo(0, 10, this.storage.get("phnNo")).subscribe(res => {
      this.storage.set('user', res.user[0]);
      this.user = res.user[0];
    },
      err => { console.log(err) })
  }

  addBets() {
    if (this.amount >= 5) {
      this.myBetLists.push({ digit: this.digit, amount: this.amount });
      this.digit = '';
      this.amount = '';
    } else {
      this.presentToast('Minimum betting amount is Rs. 5');
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
    let sub: any;
    console.log(this.myBetLists)
    let amount = 0;
    this.myBetLists.map((bet: any) => {
      amount += bet.amount
      const payload = {
        "type": this.storage.get('patti'),
        "date": "2023-02-09",
        "bajiNo": this.placeBetTitle.slotName,
        "number": bet.digit,
        "amount": bet.amount,
        "result": "",
        "user": this.user.id,
        "gameId": this.storage.get('gameId')
      }
      sub = this.amBetsService.setBid(payload).subscribe(res => console.log(res), err => { console.log(err) })
    });
    //console.log(amount);

    const settle = {
      id: this.user.id,
      type: 'minus',
      amount: amount
    }
    this.amBetsService.settlePayment(settle).subscribe(res => {
      {
        this.getUserDetails();
        this.digit = '';
        this.amount = '';
        this.myBetLists = [];
        this.presentToast('Betting Success');
        this.route.navigateByUrl('/');
      }
    }, err => {
      console.log(err)
    })
  }


}
