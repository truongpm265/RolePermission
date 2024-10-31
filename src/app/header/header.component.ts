import { Component } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';

import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  roles: string[] = [];
  userFunctions: string[] = [];

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private authService:AuthService
  ) {}
  
  ngOnInit(): void {
    this.roles = this.authService.getUserRoles();
    this.userFunctions = this.authService.getUserFunctions();
    console.log(this.userFunctions);
  }


  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  hasFunction(func:string):boolean{
    return this.userFunctions.includes(func)
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }
}
