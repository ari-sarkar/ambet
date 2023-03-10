import { LoaderService } from './../loader.service';
import { Router } from '@angular/router';
import { AmBetsService } from './../ambets.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Component, Inject, OnInit } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  no: any;
  name: any;
  password: any;
  passwordRepeat: any;
  isFormOk: boolean = false;
  toast: any;
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
    if (this.no && this.name && this.password) {
      this.isFormOk = true
    }
  }

  save() {
    if (this.password !== this.passwordRepeat) {
      this.presentToast("Password do not match", 'danger', 'top');
    } else if (this.no.toString().length < 10) {
      this.presentToast("Please Enter a Valid No", 'danger', 'top');
    }
    else {
      this.searchUser();
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
      console.log(res);
      if (res.status === 200 && res.totalElements !== 0) {
        this.presentToast("User exists please login", 'primary', 'top');
      } else {
        const payload = {
          name: this.name,
          phoneNo: this.no,
          walletBalance: "0",
          totalRechargeAmount: 0,
          password: this.password
        }
        this.addUser(payload);
      }
    }, err => { console.log(err); loading.dismiss(); })
  }

  addUser(payload: any) {
    this.loaderService.showLoading('Registering user details...');
    this.amBetsService.addUser(payload)
      .pipe(finalize(() => this.loaderService.dismiss()))
      .subscribe(res => {
        console.log(res);
        this.storage.set("phnNo", this.no);
        this.route.navigateByUrl("/tabs/home");
      }, err => { console.log(err) })
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
