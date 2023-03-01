import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrueLoginPage } from './true-login.page';

const routes: Routes = [
  {
    path: '',
    component: TrueLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrueLoginPageRoutingModule {}
