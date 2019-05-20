import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';

import { MessagesComponent } from './core/messages/messages.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddBookComponent } from './add-book/add-book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { JwtInterceptor } from './shared/helpers/jwt.interceptor';
import { ErrorInterceptor } from './shared/helpers/http.interceptor';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    MessagesComponent,
    AddBookComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    CoreModule
  ],
  providers: [    
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
