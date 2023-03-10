import { WpShareComponent } from './../wp-share/wp-share.component';
import { GameTimesComponent } from './../game-times/game-times.component';
import { GameRulesComponent } from './../game-rules/game-rules.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'my-bids',
        loadChildren: () =>
          import('../my-bids/my-bids.module').then((m) => m.MyBidsPageModule),
      },
      {
        path: 'results',
        loadChildren: () =>
          import('../results/results.module').then((m) => m.ResultsPageModule),
      },
      {
        path: 'support',
        loadChildren: () =>
          import('../support/support.module').then((m) => m.SupportPageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: 'game-rules',
        component: GameRulesComponent

      },
      {
        path: 'game-times',
        component: GameTimesComponent

      },
      {
        path: 'share',
        component: WpShareComponent

      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/true-login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
