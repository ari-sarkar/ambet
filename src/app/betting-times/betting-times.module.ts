import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BettingTimesPageRoutingModule } from './betting-times-routing.module';

import { BettingTimesPage } from './betting-times.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BettingTimesPageRoutingModule
  ],
  declarations: [BettingTimesPage]
})
export class BettingTimesPageModule {}
