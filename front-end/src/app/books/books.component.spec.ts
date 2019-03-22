import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksComponent } from './books.component';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule, MatIconModule,
  MatInputModule, MatListModule, MatMenuModule,
  MatOptionModule,
  MatSelectModule, MatToolbarModule
} from "@angular/material";
import {LayoutModule} from "@angular/cdk/layout";
import {AddBookComponent} from "../add-book/add-book.component";

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksComponent, AddBookComponent ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        LayoutModule,
        MatListModule,
        MatToolbarModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
