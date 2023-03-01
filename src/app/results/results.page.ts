import { Component, Inject } from '@angular/core';
import { AmBetsService } from '../ambets.service';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';


@Component({
  selector: 'app-results',
  templateUrl: 'results.page.html',
  styleUrls: ['results.page.scss'],
})
export class ResultsPage {
  winningsOne: any = [];
  gameList: any = []
  hide: boolean = true;
  user: any;
  selectedGame: any;
  date: any
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
    //console.log(e.detail.value)
    this.selectedGame = e.detail.value;
    this.winningsOne = [];
  }


  dateChange(e: any) {
    const date = new Date(e.target.value).toLocaleDateString();
    const dateArray = date.split('/');
    if (parseInt(dateArray[0]) > 9) {
      if (parseInt(dateArray[1]) > 9) {
        this.date = `${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`
      } else {
        this.date = `${dateArray[2]}-${dateArray[0]}-0${dateArray[1]}`
      }
    } else {
      if (parseInt(dateArray[1]) > 9) {
        this.date = `${dateArray[2]}-0${dateArray[0]}-${dateArray[1]}`
      } else {
        this.date = `${dateArray[2]}-0${dateArray[0]}-0${dateArray[1]}`
      }
    }
    console.log(this.date);
    this.hide = false;
    this.getResults()
  }
  getResults() {
    const payload = {
      page: 0,
      size: 10,
      id: this.selectedGame.id,
      date: this.date
    }
    this.amBetsService.getResultByGameAndDate(payload).subscribe(res => {
      this.winningsOne = res.data;
    }, err => { console.log(err) })
  }

  daysInMonth(month: any, year: any) { // Use 1 for January, 2 for February, etc.
    return new Date(year, month, 0).getDate();
  }

}
