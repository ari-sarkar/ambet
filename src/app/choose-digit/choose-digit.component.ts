import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-choose-digit',
  templateUrl: './choose-digit.component.html',
  styleUrls: ['./choose-digit.component.scss'],
})
export class ChooseDigitComponent implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
  ) { }

  ngOnInit() { }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('', 'confirm');
  }

  placeBet(digit: string) {
    this.storage.set('patti', digit);
    this.cancel();
    this.router.navigateByUrl('/place-bet');
  }
}
