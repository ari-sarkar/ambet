import { map } from 'rxjs/operators';
import { AmBetsService } from './../ambets.service';
import { ChooseDigitComponent } from './../choose-digit/choose-digit.component';
import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-betting-times',
  templateUrl: './betting-times.page.html',
  styleUrls: ['./betting-times.page.scss'],
})
export class BettingTimesPage implements OnInit {
  bettingTimeList: any = [];
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private amBetsService: AmBetsService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
  ) { }

  ngOnInit() {
    this.getAllSlots(this.storage.get('gameId'));
  }

  // play(bet: any) {
  //   //this.router.navigateByUrl('/place-bet');
  // }

  getAllSlots(id: string) {
    this.amBetsService.getSlotsByGameId(id).subscribe(res => {
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
