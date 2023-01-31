import { ChooseDigitComponent } from './../choose-digit/choose-digit.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-betting-times',
  templateUrl: './betting-times.page.html',
  styleUrls: ['./betting-times.page.scss'],
})
export class BettingTimesPage implements OnInit {
  bettingTimeList: any = [
    {
      name: 'Bazi 1',
      startTime: '03.00 am',
      endTime: '10.00 am',
      isOpen: true,
    },
    {
      name: 'Bazi 2',
      startTime: '03.00 am',
      endTime: '10.00 am',
      isOpen: false,
    },
    {
      name: 'Bazi 3',
      startTime: '03.00 am',
      endTime: '10.00 am',
      isOpen: false,
    },
    {
      name: 'Bazi 4',
      startTime: '03.00 am',
      endTime: '10.00 am',
      isOpen: false,
    },
    {
      name: 'Bazi 5',
      startTime: '03.00 am',
      endTime: '10.00 am',
      isOpen: false,
    },
    {
      name: 'Bazi 6',
      startTime: '03.00 am',
      endTime: '10.00 am',
      isOpen: false,
    },
    {
      name: 'Bazi 7',
      startTime: '03.00 am',
      endTime: '10.00 am',
      isOpen: false,
    },
    {
      name: 'Bazi 8',
      startTime: '03.00 am',
      endTime: '10.00 am',
      isOpen: false,
    },
  ];
  constructor(private router: Router, private modalCtrl: ModalController) {}

  ngOnInit() {}

  // play(bet: any) {
  //   //this.router.navigateByUrl('/place-bet');
  // }

  async play(bet: any) {
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
