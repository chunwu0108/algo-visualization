import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component'
import { Algo1Component } from '../algo1/algo1.component'
import { Algo2Component } from '../algo2/algo2.component'
import { Algo3Component } from '../algo3/algo3.component'

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'algo1',
    component: Algo1Component,
  },
  {
    path: 'algo2',
    component: Algo2Component,
  },
  {
    path: 'algo3',
    component: Algo3Component,
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', 
    })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }