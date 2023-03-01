import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { WpShareComponent } from './../wp-share/wp-share.component';
import { GameTimesComponent } from './../game-times/game-times.component';
import { GameRulesComponent } from './../game-rules/game-rules.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage, GameRulesComponent, GameTimesComponent, WpShareComponent],
  providers: [SocialSharing]
})
export class TabsPageModule { }
