import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search-page/search-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbDropdownModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {ToasterComponent} from '../shared/toaster/toaster.component';
import {ToasterContainerComponent} from '../shared/toaster-container/toaster-container.component';
import { FaqPageComponent } from './faq-page/faq-page.component';


const routes: Routes = [
  {
    path: 'search',
    component: SearchPageComponent
  },
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  },
  {
    path: 'faq',
    component: FaqPageComponent
  }
];


@NgModule({
  declarations: [SearchPageComponent, DashboardPageComponent, ToasterComponent, ToasterContainerComponent, FaqPageComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class RoutesModule { }
