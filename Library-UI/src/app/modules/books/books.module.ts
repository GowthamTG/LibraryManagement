import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../books-routing.module';

import { AddBookComponent } from './add-book/add-book.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [AddBookComponent, LandingComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
})
export class BooksModule {}
