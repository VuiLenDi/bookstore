import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  signup() {
    if (this.form.valid) {
      this.authenticationService.signup(this.form.value.email,this.form.value.password).subscribe(user => {
        this.myRoute.navigate(["login"]);
        alert('success');
      });
    }
  }
}
