import { LoaderService } from './../loader.service';
import { Router } from '@angular/router';
import { AmBetsService } from './../ambets.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Component, Inject, OnInit } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-true-login',
  templateUrl: './true-login.page.html',
  styleUrls: ['./true-login.page.scss'],
})
export class TrueLoginPage implements OnInit {
  no: any;
  name: any;
  password: any;
  passwordRepeat: any;
  isFormOk: boolean = false;
  toast: any;
  isExistingUser: boolean = false;
  constructor(
    private toastController: ToastController,
    private amBetsService: AmBetsService,
    private route: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private loaderService: LoaderService,
    private loadingCtrl: LoadingController
  ) {
    if (this.storage.get("phnNo")) {
      this.route.navigateByUrl("/tabs/home");
    }
  }

  ngOnInit() {
  }

  passChange() {
    if (this.no && this.password) {
      this.isFormOk = true
    }
  }

  save() {
    if (!this.password) {
      this.presentToast("Please enter password", 'danger', 'top');
    } else if (this.no.toString().length < 10) {
      this.presentToast("Please Enter a Valid No", 'danger', 'top');
    }
    else {
      this.searchUser();
      // const payload = {
      //   name: this.name,
      //   phoneNo: this.no,
      //   walletBalance: "0",
      //   totalRechargeAmount: 0,
      //   password: this.password
      // }
      // this.addUser(payload);
    }
    // console.log(this.no.toString().length, this.name, this.password, this.passwordRepeat)
  }

  async searchUser() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      cssClass: 'custom-loading',
    });

    loading.present();
    this.amBetsService.getUserByNo(0, 10, this.no).subscribe(res => {
      loading.dismiss();
      //console.log(res);
      if (res.status === 200 && res.totalElements !== 0) {
        this.isExistingUser = true;
        if (this.password === res.user[0].password) {
          this.storage.set('user', res.user[0]);
          this.storage.set('phnNo', this.no);
          this.route.navigateByUrl('/tabs/home');

        } else {
          this.presentToast("Wrong password", 'danger', 'top');
        }
      } else {
        this.isExistingUser = false;
        this.presentToast("No user found by this no", 'danger', 'top');
      }
    }, err => { console.log(err); loading.dismiss(); })
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
