import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Book } from "../shared/models/book";

import { FormGroup, FormControl, Validators } from "@angular/forms";

import {BookService} from "../books/book.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit, OnDestroy {

  @Output() updateBooks: EventEmitter<any> = new EventEmitter();
  unsubscribe = new Subject();

  book: Book = {
    id: 0,
    title: '',
    desc: '',
    category: ''
  };
  bookForm: FormGroup;

  categories = ['Drama', 'Comedy', 'Sport'];

  submitted = false;

  onSubmit(formDir) {
    if(!this.bookForm.valid) {
      return;
    }

    if(this.title.value.trim().length == 0 ||
      this.desc.value.trim().length == 0 ||
      this.category.value.trim().length == 0
    ) {
      return;
    }

    this.submitted = true;
    const data: Book = this.bookForm.value;

    this.bookService.addBook( data )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.updateBooks.emit(null);
        formDir.resetForm();
        this.bookForm.reset();
    });
  }

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookForm = new FormGroup({
      'title': new FormControl(this.book.title, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      'category': new FormControl(this.book.category, Validators.required),
      'desc': new FormControl(this.book.desc, Validators.required)
    });
  }

  get title() { return this.bookForm.get('title') }
  get category() { return this.bookForm.get('category') }
  get desc() { return this.bookForm.get('desc') }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
