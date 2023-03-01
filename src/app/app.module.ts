import { AmBetsService } from './ambets.service';
import { WithdrawMoneyComponent } from './withdraw-money/withdraw-money.component';
import { PaymentComponent } from './payment/payment.component';
import { ChooseDigitComponent } from './choose-digit/choose-digit.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StorageServiceModule, LOCAL_STORAGE } from 'ngx-webstorage-service';

@NgModule({
  declarations: [
    AppComponent,
    ChooseDigitComponent,
    PaymentComponent,
    WithdrawMoneyComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, HttpClient, AmBetsService],
  bootstrap: [AppComponent],
})
export class AppModule { }
