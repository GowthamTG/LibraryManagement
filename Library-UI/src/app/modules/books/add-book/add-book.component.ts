import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { DialogComponent } from "src/app/dialog/dialog.component";
import { ApiClientService } from "src/app/services/api-client.service";

@Component({
  selector: "app-add-book",
  templateUrl: "./add-book.component.html",
  styleUrls: ["./add-book.component.scss"],
})
export class AddBookComponent implements OnInit {
  addBookFrom: FormGroup = this.fb.group({
    author: [""],
    country: [""],
    imageLink: [""],
    language: [""],
    pages: [""],
    title: [""],
    year: [""],
  });
  formValue: any;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private apiService: ApiClientService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.formValue = { ...this.addBookFrom.value };
    console.log(this.addBookFrom.value);
    this.formValue.year = this.addBookFrom.value.year.getYear();
    this.formValue.pages = parseInt(this.addBookFrom.value.pages);
    console.log(this.formValue);

    this.apiService.addBook({ ...this.formValue }).subscribe({
      next: (val) => {
        console.log(val);
        this.dialog.open(DialogComponent, {
          data: {
            heading: `Book Added`,
            message: `Book Added Successfully`,
          },
        });
        this.router.navigate([""]);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  reset() {
    this.addBookFrom.reset();
  }
}
