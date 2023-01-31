import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceBetPageRoutingModule } from './place-bet-routing.module';

import { PlaceBetPage } from './place-bet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceBetPageRoutingModule
  ],
  declarations: [PlaceBetPage]
})
export class PlaceBetPageModule {}
