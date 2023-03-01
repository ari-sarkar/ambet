import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AmBetsService } from './../ambets.service';
import { Component, Inject, ViewChild } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { InfiniteScrollCustomEvent, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-my-bids',
  templateUrl: 'my-bids.page.html',
  styleUrls: ['my-bids.page.scss'],
})
export class MyBidsPage {
  @ViewChild("infiniteScroll")
  infiniteScroll!: IonInfiniteScroll;
  gameList: any = []
  hide: boolean = true;
  user: any;
  bets: any = [];
  selectedGame: any;
  rName: string = "single";
  page: number = 0;
  constructor(private amBetsService: AmBetsService, @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.data.subscribe(() => {
      this.getAllGames();
      this.getUserDetails();
    })

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
    this.page = 0;
    this.bets = [];
    this.getBidsForUser();
  }

  onIonInfinite(ev: any) {
    this.page += 1;
    this.getBidsForUser();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  getBidsForUser() {
    this.amBetsService.getBetsByUserId(this.page, 10, this.user.id, this.selectedGame.id, this.rName).subscribe(res => {
      //console.log(res, this.rName)
      if (res.data.length > 0) {
        res.data.map((bet: any) => {
          bet.Date = new Date(bet.date).toLocaleDateString()
        });
        const filteredData = res.data.filter((bet: { type: string; }) => {
          return bet.type == this.rName
          //if (bet.type !== this.rName) {
          //   this.bets.splice(i, 1);
          // }
        })
        filteredData.map((each: any) => {
          this.bets.push(each)
        })
        this.infiniteScroll.disabled = false;
        //console.log(this.bets);
      } else {
        this.infiniteScroll.disabled = true;
      }
    }, err => {
      console.log(err)
    })
  }
}
