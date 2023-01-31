import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-choose-digit',
  templateUrl: './choose-digit.component.html',
  styleUrls: ['./choose-digit.component.scss'],
})
export class ChooseDigitComponent implements OnInit {
  constructor(private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {}
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('', 'confirm');
  }

  placeBet(digit: string) {
    this.cancel();
    this.router.navigateByUrl('/place-bet');
  }
}
