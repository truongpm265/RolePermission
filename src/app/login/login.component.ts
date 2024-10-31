import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { UserDetails } from '../models/user-details.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        response => {
          localStorage.setItem('token', response.token);
          console.log(response)
          this.authService.getUserDetails().subscribe(
            (userDetails: UserDetails) => {
                // Lưu trữ thông tin người dùng
                localStorage.setItem('username', userDetails.username);
                localStorage.setItem('roles', JSON.stringify(userDetails.roles));
                localStorage.setItem('functions', JSON.stringify(userDetails.functions));
                // Chuyển hướng theo vai trò
                if (userDetails.roles.includes('ADMIN')) {
                    this.router.navigate(['/admin']);
                } else {
                    this.router.navigate(['/user']);
                }
            },
            error => {
                this.errorMessage = 'Failed to retrieve user details';
            }
        );
    },
        error => {
          this.errorMessage = 'Invalid username or password';
        }
      );
    }
  }
}