import { Component } from '@angular/core';
import { LocalStorageService } from './shared/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Book Store';
  control: any = {
    enableLogoutButton: false
  }

  constructor(private localStorageService: LocalStorageService, private router: Router) {
    this.localStorageService.getItem('currentUser').subscribe(data => {
      if (data) {
        this.control.enableLogoutButton = true;
      }
    })
  }

  logout() {
    this.localStorageService.deleteItem('currentUser').add(data => {
      this.control.enableLogoutButton = false;
      this.router.navigate(['login']);
    })
  }
}
