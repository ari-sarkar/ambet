import { finalize, map } from 'rxjs/operators';
import { AmBetsService } from './../ambets.service';
import { ChooseDigitComponent } from './../choose-digit/choose-digit.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-betting-times',
  templateUrl: './betting-times.page.html',
  styleUrls: ['./betting-times.page.scss'],
})
export class BettingTimesPage implements OnInit {
  bettingTimeList: any = [];
  gameName = ''
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private amBetsService: AmBetsService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private loadingCtrl: LoadingController,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.data.subscribe(() => {
      this.gameName = this.storage.get('gameName');
      this.getAllSlots(this.storage.get('gameId'));
    })
  }

  ngOnInit() {

  }

  async getAllSlots(id: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Getting bet times...',
    });

    loading.present();
    this.amBetsService.getSlotsByGameId(id)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(res => {
        res.data.map((r: any) => {
          let hourStart = 0;
          let hourEnd = 0;
          let minStart = 0;
          let minEnd = 0;
          if (r.startTime.includes(":")) {
            const dateOneArray = r.startTime.split(":");
            hourStart = parseInt(dateOneArray[0]);
            minStart = parseInt(dateOneArray[1]);
          } else {
            hourStart = parseInt(r.startTime);
            minStart = 0;
          }
          if (r.endTime.includes(":")) {
            const dateTwoArray = r.endTime.split(":");
            hourEnd = parseInt(dateTwoArray[0]);
            minEnd = parseInt(dateTwoArray[1]);
          } else {
            hourEnd = parseInt(r.endTime);
            minEnd = 0;
          }
          r.startHour = hourStart
          r.endHour = hourEnd
          r.startMin = minStart
          r.endMin = minEnd
          r.totalEndMinute = (hourEnd * 60) + minEnd;
        })
        this.bettingTimeList = res.data;
        this.bettingTimeList.map((bt: any) => {
          bt.isOpen = false;
        })
        console.log(res)
      }, err => console.log(err))
  }

  async play(bet: any) {
    console.log(bet);
    this.storage.set('slotId', bet.id);
    this.storage.set('slotName', bet.name);
    this.storage.set('endTime', bet.endTime);
    this.storage.set('totalEndMinute', bet.totalEndMinute);
    const modal = await this.modalCtrl.create({
      component: ChooseDigitComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      //`Hello, ${data}!`;
    }
  }
}
