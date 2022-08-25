import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ApiClientService } from 'src/app/services/api-client.service';
import { Book } from 'src/app/interfaces/books.interface';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  numbers = Array(10)
    .fill(0)
    .map((x, i) => i);

  filterForm: FormGroup = this.fb.group({
    author: [''],
    title: [''],
    dateFrom: [''],
    dateTo: [''],
  });
  cols: number = 1;
  page = 1;

  books: Book[] = [];

  gridByBreakpoint = {
    xl: 8,
    lg: 5,
    md: 3,
    sm: 2,
    xs: 1,
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private apiService: ApiClientService
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.cols = this.gridByBreakpoint.xs;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.cols = this.gridByBreakpoint.sm;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.cols = this.gridByBreakpoint.md;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.cols = this.gridByBreakpoint.lg;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.cols = this.gridByBreakpoint.xl;
          }
        }
      });
    this.apiService
      .getBooksCondition({ ...this.filterForm.value, page: this.page })
      .subscribe({
        next: (val) => {
          console.log(val);
          this.books.push(...val.books);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
  }
  reset() {
    this.filterForm.reset();

    this.page = 1;
    this.apiService
      .getBooksCondition({ ...this.filterForm.value, page: this.page })
      .subscribe({
        next: (val) => {
          console.log(val);
          this.books.push(...val.books);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
    this.filterForm.setValue({
      author: '',
      title: '',
      dateFrom: '',
      dateTo: '',
    });
  }
  onSubmit() {
    console.log(this.filterForm.value);
    this.page = 1;
    this.apiService.getBooksCondition(this.filterForm.value).subscribe({
      next: (val) => {
        this.books = val.books;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  onScroll() {
    this.page += 1;
    this.apiService
      .getBooksCondition({ ...this.filterForm.value, page: this.page })
      .subscribe({
        next: (val) => {
          console.log(val);
          this.books.push(...val.books);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
  }
}
