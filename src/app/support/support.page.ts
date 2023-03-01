import { Component, Inject, OnInit } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  admin: any
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,) { }

  ngOnInit() {
    this.admin = this.storage.get("admin");
  }

}
