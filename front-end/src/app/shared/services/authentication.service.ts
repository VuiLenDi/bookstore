import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
      this.localStorageService.getItem('currentUser').subscribe((data) => {
        this.currentUserSubject = new BehaviorSubject<User>(data);
        this.currentUser = this.currentUserSubject.asObservable();
      })
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    public isLoggedIn() {
      return this.localStorageService.getItem('currentUser');
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/auth/login`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.data) {
                  let data: User = {
                    id: user.data.id,
                    username: user.data.username,
                    password: user.data.password,
                    firstName: '',
                    lastName: '',
                    token: user.data.token
                  }
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  this.localStorageService.insertItem('currentUser',user.data).add(() => {
                    this.currentUserSubject.next(user);
                  })
                }
                return user;
            }));
    }

    signup(username: string, password: string) {
      return this.http.post<any>(`${environment.apiUrl}/api/auth/register`, { username, password })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              return user;
          }));
      }

    logout() {
        // remove user from local storage to log user out
        this.localStorageService.deleteItem('currentUser').add(() => {
          this.currentUserSubject.next(null);
        });
    }
}