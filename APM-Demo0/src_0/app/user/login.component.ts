import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';
import { Store, select } from '@ngrx/store';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;
  public userName: string;
  public password: string;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<any>) {
  }

  ngOnInit(): void {
    // ToDo: Unsubsribe
    this.store.pipe(select('user')).subscribe (
      userq => {
        if (userq) {
          this.maskUserName = userq.maskUserName;
          if (userq.profile) {
            console.log("test: " + userq.profile.user)
            this.userName = userq.profile.user;
            this.password = userq.profile.password;
          }
          

        }
      });
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    // this.maskUserName = value;
    this.store.dispatch({
      type: 'TOGGLE_MASK_USER_NAME',
      payload: value
    });
  }


  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      this.userName = loginForm.form.value.userName;
      this.password = loginForm.form.value.password;
      this.authService.login(this.userName, this.password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
        
        this.store.dispatch({
          type: 'SET_USER_NAME',
          payload: { user: this.userName, password: this.password}
        });


      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
