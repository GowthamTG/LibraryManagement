import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { MatDialogModule } from "@angular/material/dialog";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MatButtonModule } from "@angular/material/button";

import { ErrorInterceptor } from "./error-interceptor";

import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DialogComponent } from "./dialog/dialog.component";

@NgModule({
  declarations: [AppComponent, DialogComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
