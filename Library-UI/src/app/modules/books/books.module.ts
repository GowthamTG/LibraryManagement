import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { BooksRoutingModule } from '../books-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AddBookComponent } from './add-book/add-book.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [AddBookComponent, LandingComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    InfiniteScrollModule,
    BooksRoutingModule,
  ],
})
export class BooksModule {}
