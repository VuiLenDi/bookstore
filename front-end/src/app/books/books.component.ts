import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from "../shared/models/book";

import { BookService } from "./book.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {
  books: Book[];
  unsubscribe = new Subject();

  getBooks(): void {
    this.bookService.getBooks()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(books => this.books = books);
  }

  constructor(private bookService: BookService) {

  }

  ngOnInit() {
    this.getBooks();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
