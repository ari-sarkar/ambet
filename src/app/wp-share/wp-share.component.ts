import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-wp-share',
  templateUrl: './wp-share.component.html',
  styleUrls: ['./wp-share.component.scss'],
})
export class WpShareComponent implements OnInit {

  constructor(
    private socialSharing: SocialSharing,
    private loadingController: LoadingController,
    private router: Router
  ) { }

  ngOnInit() { }

  nav() {
    this.router.navigateByUrl("/tabs/home");
  }

  async share() {
    const loading = await this.loadingController.create({
      message: '',
    });
    await loading.present();
    this.socialSharing
      .share(
        'Download AMBet app from this link and win exciting rewards.',
        '',
        '',
        ''
      )
      .then(async () => {
        loading.dismiss();
        console.log('success');
        //await loading.dismiss();
      })
      .catch(async () => {
        loading.dismiss();
        //console.log('Error');
        window.alert('Something went wrong, please try again later');
        //await loading.dismiss();
      });
  }
}
