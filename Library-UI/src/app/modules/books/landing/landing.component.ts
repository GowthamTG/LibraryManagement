import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    name: [''],
    author: [''],
    subject: [''],
    dateFrom: [''],
    dateTo: [''],
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
