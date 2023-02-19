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
  winningsTwo: any = [];
  winningsThree: any = [];
  winningsFour: any = [];
  gameList: any = []
  hide: boolean = true;
  user: any;
  selectedGame: any;
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
    this.hide = false;
    this.selectedGame = e.detail.value;
    const today = new Date();
    const date = new Date().toLocaleDateString();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const totalDaysInMonth = this.daysInMonth(month, year);
    console.log(totalDaysInMonth);
    if (day > 3) {
      //?1
      const payload0 = {
        page: 0,
        size: 10,
        id: this.selectedGame.id,
        date: date
      }
      this.amBetsService.getResultByGameAndDate(payload0).subscribe(res => {
        this.winningsOne = res.data;
      }, err => { console.log(err) })
      //?2
      const payload1 = {
        page: 0,
        size: 10,
        id: this.selectedGame.id,
        date: `${month}/${day - 1}/${year}`
      }
      this.amBetsService.getResultByGameAndDate(payload1).subscribe(res => {
        this.winningsTwo = res.data;
      }, err => { console.log(err) })
      //?3
      const payload2 = {
        page: 0,
        size: 10,
        id: this.selectedGame.id,
        date: `${month}/${day - 2}/${year}`
      }
      this.amBetsService.getResultByGameAndDate(payload2).subscribe(res => {
        this.winningsThree = res.data;
      }, err => { console.log(err) })
      //?4
      const payload3 = {
        page: 0,
        size: 10,
        id: this.selectedGame.id,
        date: `${month}/${day - 3}/${year}`
      }
      this.amBetsService.getResultByGameAndDate(payload3).subscribe(res => {
        this.winningsFour = res.data;
      }, err => { console.log(err) })
    } else if (day === 3) {
      //?1
      const payload0 = {
        page: 0,
        size: 10,
        id: this.selectedGame.id,
        date: date
      }
      this.amBetsService.getResultByGameAndDate(payload0).subscribe(res => {
        this.winningsOne = res.data;
      }, err => { console.log(err) })
      //?2
      const payload1 = {
        page: 0,
        size: 10,
        id: this.selectedGame.id,
        date: `${month}/${day - 1}/${year}`
      }
      this.amBetsService.getResultByGameAndDate(payload1).subscribe(res => {
        this.winningsTwo = res.data;
      }, err => { console.log(err) })
      //?3
      const payload2 = {
        page: 0,
        size: 10,
        id: this.selectedGame.id,
        date: `${month}/${day - 2}/${year}`
      }
      this.amBetsService.getResultByGameAndDate(payload2).subscribe(res => {
        this.winningsThree = res.data;
      }, err => { console.log(err) })
      //?4
      const payload3 = {
        page: 0,
        size: 10,
        id: this.selectedGame.id,
        date: `${month}/${totalDaysInMonth}/${year}`
      }
      this.amBetsService.getResultByGameAndDate(payload3).subscribe(res => {
        this.winningsFour = res.data;
      }, err => { console.log(err) })
    } else if (day === 2) {
      //?1
      const payload0 = {
        page: 0,
        size: 10,
        id: this.selectedGame.id,
        date: date
      }
      this.amBetsService.getResultByGameAndDate(payload0).subscribe(res => {
        this.winningsOne = res.data;
      }, err => { console.log(err) })
      //?2
      const payload1 = {
        page: 0,
        size: 10,
        id: this.selectedGame.id,
        date: `${month}/${day - 1}/${year}`
      }
      this.amBetsService.getResultByGameAndDate(payload1).subscribe(res => {
        this.winningsTwo = res.data;
      }, err => { console.log(err) })
      //?3
      const payload2 = {
        page: 0,
        size: 10,
        id: this.selectedGame.id,
        date: `${month}/${totalDaysInMonth}/${year}`
      }
      this.amBetsService.getResultByGameAndDate(payload2).subscribe(res => {
        this.winningsThree = res.data;
      }, err => { console.log(err) })
      //?4
      const payload3 = {
        page: 0,
        size: 10,
        id: this.selectedGame.id,
        date: `${month}/${totalDaysInMonth - 1}/${year}`
      }
      this.amBetsService.getResultByGameAndDate(payload3).subscribe(res => {
        this.winningsFour = res.data;
      }, err => { console.log(err) })
    } else if (day === 1) {
      //?1
      const payload0 = {
        page: 0,
        size: 10,
        id: this.selectedGame.id,
        date: date
      }
      this.amBetsService.getResultByGameAndDate(payload0).subscribe(res => {
        this.winningsOne = res.data;
      }, err => { console.log(err) })
      //?2
      const payload1 = {
        page: 0,
        size: 10,
        id: this.selectedGame.id,
        date: `${month}/${totalDaysInMonth}/${year}`
      }
      this.amBetsService.getResultByGameAndDate(payload1).subscribe(res => {
        this.winningsTwo = res.data;
      }, err => { console.log(err) })
      //?3
      const payload2 = {
        page: 0,
        size: 10,
        id: this.selectedGame.id,
        date: `${month}/${totalDaysInMonth - 1}/${year}`
      }
      this.amBetsService.getResultByGameAndDate(payload2).subscribe(res => {
        this.winningsThree = res.data;
      }, err => { console.log(err) })
      //?4
      const payload3 = {
        page: 0,
        size: 10,
        id: this.selectedGame.id,
        date: `${month}/${totalDaysInMonth - 2}/${year}`
      }
      this.amBetsService.getResultByGameAndDate(payload3).subscribe(res => {
        this.winningsFour = res.data;
      }, err => { console.log(err) })
    }

  }

  daysInMonth(month: any, year: any) { // Use 1 for January, 2 for February, etc.
    return new Date(year, month, 0).getDate();
  }

}
