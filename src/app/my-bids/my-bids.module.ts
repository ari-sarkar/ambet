import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyBidsPage } from './my-bids.page';

import { MyBidsPageRoutingModule } from './my-bids-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MyBidsPageRoutingModule
  ],
  declarations: [MyBidsPage]
})
export class MyBidsPageModule {}
