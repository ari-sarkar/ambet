import { Component } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: 'results.page.html',
  styleUrls: ['results.page.scss'],
})
export class ResultsPage {
  winnings: any = [
    {
      date: '01/02/2023',
      times: [
        { top: 5, bottom: 567 },
        { top: 1, bottom: 857 },
        { top: 0, bottom: 888 },
        { top: '-', bottom: '-' },
        { top: '-', bottom: '-' },
        { top: '-', bottom: '-' },
        { top: '-', bottom: '-' },
        { top: '-', bottom: '-' },
      ],
    },
    {
      date: '31/01/2023',
      times: [
        { top: 4, bottom: 607 },
        { top: 3, bottom: 807 },
        { top: 9, bottom: 818 },
        { top: 5, bottom: 200 },
        { top: 1, bottom: 238 },
        { top: 0, bottom: 520 },
        { top: 2, bottom: 800 },
        { top: 6, bottom: 106 },
      ],
    },
  ];
  constructor() {}
}
