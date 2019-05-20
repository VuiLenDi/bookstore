import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form;
  constructor(private fb: FormBuilder,
    private myRoute: Router,
    private authenticationService: AuthenticationService
    ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
  }

  login() {
    if (this.form.valid) {
      this.authenticationService.login(this.form.value.email,this.form.value.password).subscribe(user => {
        this.myRoute.navigateByUrl("/books");
      });
    }
  }

}
