import { AmBetsService } from './../ambets.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-times',
  templateUrl: './game-times.component.html',
  styleUrls: ['./game-times.component.scss'],
})
export class GameTimesComponent implements OnInit {
  data: any;
  constructor(private router: Router, private amBetsService: AmBetsService) { }

  ngOnInit() { this.getAll() }

  gotoHome() {
    this.router.navigateByUrl("/tabs/home")
  }
  getAll() {
    this.amBetsService.getAllByUrl('/game-times/get')
      .subscribe(res => {
        res.data.map((time: any) => {
          time.bazis = time.slotName.split("#");
          time.results = time.resultTime.split("#");
        })
        this.data = res.data;
        console.log(this.data);
      }, err => {
        console.log(err)
      })
  };
}
