import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import {first, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = "";
  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit() {
  }
  login(e) {
    this.auth.signin(e.target.email.value, e.target.password.value).pipe(first()).subscribe(() => {
      console.log(e.target.email.value);
      this.router.navigateByUrl('add');
    },(err) => {
      this.errorMessage = err;
      // setTimeout(() => this.errorMessage = '', 2000);
    });
  }

}
