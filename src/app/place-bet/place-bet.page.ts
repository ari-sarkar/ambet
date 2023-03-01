import { Observable, finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentComponent } from './../payment/payment.component';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { ToastController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AmBetsService } from '../ambets.service';
import { interval } from 'rxjs';
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
  totalBettingAmount = 0;
  time: any;
  totalEndMinute: any;
  sub: any;
  subscription: any;
  date: any;
  constructor(
    private toastController: ToastController,
    private modalCtrl: ModalController,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private amBetsService: AmBetsService,
    private route: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private activeRoute: ActivatedRoute
  ) {
    this.getUserDetails();
    const date = new Date().toLocaleDateString();
    const dateArray = date.split('/');
    if (parseInt(dateArray[0]) > 9) {
      if (parseInt(dateArray[1]) > 9) {
        this.date = `${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`
      } else {
        this.date = `${dateArray[2]}-${dateArray[0]}-0${dateArray[1]}`
      }
    } else {
      if (parseInt(dateArray[1]) > 9) {
        this.date = `${dateArray[2]}-0${dateArray[0]}-${dateArray[1]}`
      } else {
        this.date = `${dateArray[2]}-0${dateArray[0]}-0${dateArray[1]}`
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    // this.subscription = this.route.events.subscribe(() => {
    //console.log(this.route.url)
    this.activeRoute.data.subscribe(() => {
      //})
      const date = new Date();
      const minutes = date.getMinutes();
      const hour = date.getHours();
      const currentTotalMin = (hour * 60) + minutes;
      //console.log(hour, minutes);
      this.placeBetTitle.gameName = this.storage.get('gameName');
      this.placeBetTitle.slotName = this.storage.get('slotName');
      this.placeBetTitle.endTime = this.storage.get('endTime');
      this.totalEndMinute = this.storage.get('totalEndMinute');
      this.placeBetTitle.patti = this.storage.get('patti') === 'single' ? 1 : 3;
      const diff = this.totalEndMinute - currentTotalMin;
      this.startTimer(diff * 60);
    })
    this.digit = '';
    this.amount = '';
    this.myBetLists = [];
    //console.log(this.sub);
    this.subscription = this.route.events.subscribe(() => {
      if (this.sub && this.route.url !== '/place-bet') {
        this.sub.unsubscribe();
        console.log('stooping sub')
      }
    })
  }

  startTimer(no: number) {
    var timer = no;
    var minutes;
    var seconds;
    var hour;
    this.sub = interval(1000).subscribe(x => {
      this.changeDetectorRef.detectChanges();
      hour = Math.floor(timer / 3600);
      console.log(timer, timer / 60)
      minutes = Math.floor(timer / 60) > 59 ? Math.floor(timer / 60) - 60 : Math.floor(timer / 60);
      seconds = Math.floor(timer % 60)
      // hour = Math.floor(timer / 60)
      // minutes = Math.floor(timer / 60);
      // seconds = Math.floor(timer * 60);

      hour = hour < 1 ? "0" + hour : hour;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      this.time = hour + ":" + minutes + ":" + seconds;

      --timer;
      if (timer <= 0) {
        this.sub.unsubscribe();
        //console.log('timer is ended');
        this.presentToast('Game has ended', 'dark');
        this.route.navigateByUrl('/betting-times')
      }
    })
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
      this.totalBettingAmount += this.amount;
      //console.log(this.totalBettingAmount);
      this.digit = '';
      this.amount = '';
    } else {
      this.presentToast('Minimum betting amount is Rs. 5');
    }
  }

  removeBet(index: number) {
    //console.log(this.myBetLists[index]);
    this.totalBettingAmount - this.myBetLists[index].amount;
    this.myBetLists.splice(index, 1);
    this.presentToast('Bet Deleted!');
  }

  async presentToast(msg: string, clr?: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'top',
      color: clr ? clr : 'dark'
    });

    await toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Are you sure ?',
      message: 'Money will be deducted from your account once you click ok.',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            //this.handlerMessage = 'Alert confirmed';
            this.gotoPayment();
          },
        },
      ],
    });

    await alert.present();
  }

  async gotoPayment() {

    let t: any = {};
    this.myBetLists.forEach((v) => {
      if (t[v.digit])
        t[v.digit] += v.amount;
      else
        t[v.digit] = v.amount;
    });
    let myBetLists=[];
    for(var key in t){
      myBetLists.push({
        digit: key,
        amount: t[key]
      })
    }
    console.log(t,myBetLists);
    if (parseInt(this.user.walletBalance) < this.totalBettingAmount) {
      this.presentToast('Insufficient balance, please top up', 'danger');
      this.route.navigateByUrl('/tabs/home');
    } else {
      const loading = await this.loadingCtrl.create({
        message: 'Placing bets...',
      });

      loading.present();
      //console.log(this.myBetLists)
      let amount = 0;
      myBetLists.map((bet: any) => {
        amount += bet.amount
        const payload = {
          "type": this.storage.get('patti'),
          "date": this.date,
          "bajiNo": this.placeBetTitle.slotName,
          "number": bet.digit,
          "amount": bet.amount,
          "result": "",
          "user": this.user.id,
          "gameId": this.storage.get('gameId')
        }
        this.amBetsService.setBid(payload)
          .pipe(finalize(() => loading.dismiss()))
          .subscribe(res => console.log(res), err => { console.log(err) })
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
          this.presentToast('Betting Placed Successfully', 'success');
          this.route.navigateByUrl('/tabs/home');
        }
      }, err => {
        console.log(err)
      })
    }
  }


}
