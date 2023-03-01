import { AmBetsService } from './../ambets.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-rules',
  templateUrl: './game-rules.component.html',
  styleUrls: ['./game-rules.component.scss'],
})
export class GameRulesComponent implements OnInit {
  data :any;
  constructor(private router: Router, private amBetsService: AmBetsService) { }

  ngOnInit() {
    this.getAll();
   }

  gotoHome() {
    this.router.navigateByUrl("/tabs/home")
  }

  getAll() {
    this.amBetsService.getAllByUrl('/game-rules/get')
      .subscribe(res => {
        res.data.map((rule:any) =>{
          rule.descriptions = rule.description.split("#");
        })
        this.data = res.data;
        console.log(this.data);
      }, err => {
        console.log(err)
      })
  };

}
