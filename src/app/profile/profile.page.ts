import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AmBetsService } from './../ambets.service';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any
  constructor(private amBetsService: AmBetsService, @Inject(LOCAL_STORAGE) private storage: WebStorageService,) { }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.amBetsService.getUserByNo(0, 10, this.storage.get("phnNo")).subscribe(res => {
      this.user = res.user[0];
    },
      err => { console.log(err) })
  }

}
