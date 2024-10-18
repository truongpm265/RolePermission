import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.roles);
        this.userAuthService.setPermissions(response.user.roles.flatMap((role: { permissions: any[]; }) => role.permissions.map(permission => permission.name))); // Lưu permissions
        this.userAuthService.setToken(response.token);
        
        console.log('User info:', response.user);
        // Log ra permissions
        response.user.roles.forEach((role: any) => {
          console.log(`Role: ${role.name}`);
          role.permissions.forEach((permission: any) => {
            console.log(`Permission: ${permission.name}`);
          });
        });
  
        const role = response.user.roles[0].name;
        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}