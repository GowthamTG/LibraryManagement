import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../books-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

import { AddBookComponent } from './add-book/add-book.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [AddBookComponent, LandingComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class BooksModule {}
