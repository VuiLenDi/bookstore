import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Book } from "../book";

import { FormGroup, FormControl, Validators } from "@angular/forms";

import {BookService} from "../book.service";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  @Output() updateBooks: EventEmitter<any> = new EventEmitter();

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

}
