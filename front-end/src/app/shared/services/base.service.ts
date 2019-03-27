import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseUrl: string = '';

  constructor() {
    this.baseUrl = environment.apiUrl;
  }
}
