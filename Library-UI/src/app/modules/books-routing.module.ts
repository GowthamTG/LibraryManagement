import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './books/add-book/add-book.component';

import { LandingComponent } from './books/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'add-books',
    component: AddBookComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
