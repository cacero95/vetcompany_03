import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CodigoPolicialPage } from './codigo-policial.page';

const routes: Routes = [
  {
    path: '',
    component: CodigoPolicialPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CodigoPolicialPage]
})
export class CodigoPolicialPageModule {}
