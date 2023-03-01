import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrueLoginPageRoutingModule } from './true-login-routing.module';

import { TrueLoginPage } from './true-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrueLoginPageRoutingModule
  ],
  declarations: [TrueLoginPage]
})
export class TrueLoginPageModule {}
