import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BettingTimesPage } from './betting-times.page';

const routes: Routes = [
  {
    path: '',
    component: BettingTimesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BettingTimesPageRoutingModule {}
