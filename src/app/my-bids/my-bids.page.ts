import { map } from 'rxjs/operators';
import { AmBetsService } from './../ambets.service';
import { Component, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-my-bids',
  templateUrl: 'my-bids.page.html',
  styleUrls: ['my-bids.page.scss'],
})
export class MyBidsPage {
  gameList: any = []
  hide: boolean = true;
  user: any;
  bets: any = [];
  selectedGame: any;
  rName: string = 'single';
  constructor(private amBetsService: AmBetsService, @Inject(LOCAL_STORAGE) private storage: WebStorageService,) {
    this.getAllGames();
    this.getUserDetails();
  }
  getAllGames() {
    this.amBetsService.getAllGames().subscribe(res => {
      this.gameList = res.data;
      //console.log(res)
    }, err => console.log(err))
  }
  getUserDetails() {
    this.amBetsService.getUserByNo(0, 10, this.storage.get("phnNo")).subscribe(res => {
      this.user = res.user[0];
    },
      err => { console.log(err) })
  }
  selectGame(e: any) {
    console.log(e.detail.value)
    this.hide = false;
    this.selectedGame = e.detail.value;
    this.getBidsForUser();
  }
  getRadio(digit: string) {
    this.rName = digit;
    this.getBidsForUser();
  }
  getBidsForUser() {
    this.amBetsService.getBetsByUserId(0, 100, this.user.id, this.selectedGame.id).subscribe(res => {
      console.log(res)
      this.bets = res.data;
      this.bets.map((bet: any) => {
        bet.Date = new Date(bet.date).toLocaleDateString()
      })
      this.bets.map((bet: any, i: number) => {
        if (bet.type !== this.rName) {
          this.bets.splice(i, 1);
        }
      })
    }, err => {
      console.log(err)
    })
  }
}
