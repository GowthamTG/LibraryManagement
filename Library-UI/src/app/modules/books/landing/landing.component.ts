import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { ApiClientService } from "src/app/services/api-client.service";
import { Book } from "src/app/interfaces/books.interface";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  numbers = Array(10)
    .fill(0)
    .map((x, i) => i);

  filterForm: FormGroup = this.fb.group({
    author: [""],
    title: [""],
    dateFrom: [""],
    dateTo: [""],
    // sortYear: [""],
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

  imageURLS: string[] = [
    "https://rukminim1.flixcart.com/image/612/612/jw0zr0w0/book/8/7/7/a-short-history-of-indian-railways-original-imafgscnhzbazb3u.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/612/612/j45wn0w0/book/7/8/2/operation-secret-recipe-original-imaev4xjpgnzwgzj.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/612/612/kz5vwy80/book/m/o/i/the-black-island-original-imagb843g9fhrvdy.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/612/612/kic17rk0-0/book/n/i/3/princeless-raven-the-pirate-princess-book-1-original-imafy4phvzyfavwn.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/612/612/knt7zbk0/book/5/m/3/black-sword-pirates-original-imag2eqzytjvxry3.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/612/612/kt1u3rk0/book/c/b/h/isabella-original-imag6hzhuygyqrsx.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/612/612/kp5sya80/book/o/b/c/the-fighting-cheyennes-original-imag3gm95ghnerfd.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/612/612/ky1vl3k0/book/a/q/i/rajaraja-chola-original-imagacv92qghgwmd.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/612/612/kj1r53k0-0/book/r/t/a/because-life-is-a-gift-stories-of-hope-courage-and-perseverance-original-imafyphg87qhfcnn.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/612/612/l1ch4sw0/book/s/x/h/quantitative-aptitude-quantum-cat-original-imagcxzbbgeyhbnu.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/612/612/kbpeoi80/book/7/1/9/geography-of-india-9th-edition-original-imafty2fff5fqznp.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/612/612/l3uhvgw0/book/i/k/c/on-the-open-road-author-signed-limited-edition-original-imagevud79n9zyah.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/612/612/l2hwwi80/book/v/0/t/allegiant-original-imagdt7cuywnhh8s.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/612/612/ja73ki80/book/7/9/8/psychology-by-pearson-5th-edition-original-imaezu57nfpydmmy.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/612/612/l3rmzrk0/book/o/n/a/perfect-genius-logical-reasoning-activity-workbook-for-class-1-2-original-imaget4tbu8hzkgr.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/612/612/km2clu80/book/z/h/q/indian-economy-original-imagf263h8zczhpn.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/612/612/knexksw0/book/h/x/x/indian-polity-for-upsc-first-edition-by-pearson-original-imag23fr6caymsn9.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/612/612/krxtrww0/book/3/o/f/cinderella-original-imag5hn9skrh3e5k.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/612/612/k0cqqvk0/book/9/0/4/fairy-unicorns-2-cloud-castle-original-imafk6czfhbnrzpg.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/832/832/kirr24w0-0/book/i/r/2/mission-nda-serve-at-young-age-original-imafyhkyzxajuej7.jpeg?q=70",
  ];
  imageURLLen = this.imageURLS.length;

  totalItems: number = 0;

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
          this.totalItems = val.totalItems;
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
      author: "",
      title: "",
      dateFrom: "",
      dateTo: "",
    });
  }
  onSubmit() {
    console.log(this.filterForm.value);
    this.page = 1;
    this.apiService.getBooksCondition(this.filterForm.value).subscribe({
      next: (val) => {
        this.books = val.books;
        this.totalItems = val.totalItems;
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

  imageURLGenrator(): string {
    var val = Math.floor(Math.random() * (this.imageURLLen + 1));
    return this.imageURLS[val];
  }
}
