import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Weather';
  showMenu = false;
  email = "";
  constructor(public authService: AuthService, public router: Router){}
  ngOnInit(){
    this.getEmail();
  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }  
  getEmail(){
    this.email = this.authService.getEmail();
  }
  logout(){
    this.toggleMenu();
    this.router.navigateByUrl('/login');
    this.authService.auth.signout();
  }
}
