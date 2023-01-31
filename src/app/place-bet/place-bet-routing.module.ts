import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaceBetPage } from './place-bet.page';

const routes: Routes = [
  {
    path: '',
    component: PlaceBetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaceBetPageRoutingModule {}
