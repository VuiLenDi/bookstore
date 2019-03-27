import {Component, OnInit} from '@angular/core';
import {Book} from "../shared/models/book";

import {BookService} from "./book.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[];

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books);
  }

  constructor(private bookService: BookService) {

  }

  ngOnInit() {
    this.getBooks();
  }

}
