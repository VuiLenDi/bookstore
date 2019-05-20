import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(protected localStorage: LocalStorage) { }

  insertItem(key: string, value: any) {
    return this.localStorage.setItem(key, value).subscribe(() => {
      console.log('Data has been saved successfully');
    });
  }

  deleteItem(key: string) {
    return this.localStorage.removeItem(key).subscribe(() => {
      console.log('Data has been removed successfully');
    });
  }

  clearDatabase() {
    return this.localStorage.clear().subscribe(() => {
      console.log('DB was clean!')
    });
  }

  /**
   * Get item with validation return data, ref: https://github.com/cyrilletuzi/angular-async-local-storage/blob/HEAD/docs/VALIDATION.md
   * Sample rxjs operations, javascript localStorage APIs, ref: https://github.com/cyrilletuzi/angular-async-local-storage/blob/HEAD/docs/MAP_OPERATIONS.md
   * @param key 
   */
  getItem(key: string) {
    //data return can be specify by replacing <any> into <T> (T: sample name of Class/Interface)
    return this.localStorage.getItem<any>(key);
  }
}
