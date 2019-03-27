import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "../core/messages/message.service";
import {BaseService} from "../shared/services/base.service";

import { HttpClientModule }    from '@angular/common/http';

describe('BookService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [HttpClient, MessageService, BaseService],
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: BookService = TestBed.get(BookService);
    expect(service).toBeTruthy();
  });
});
