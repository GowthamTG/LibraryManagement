import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  addBookFrom: FormGroup = this.fb.group({
    author: [''],
    title: [''],
    year: [''],
    pages: [''],
    imageUrl: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {}

  reset() {
    this.addBookFrom.reset();
  }
}
