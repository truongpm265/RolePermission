import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(createUserForm: NgForm) {
    if (createUserForm.valid) {
      this.userService.createUser(createUserForm.value).subscribe(
        (response: any) => {
          console.log('User created successfully!', response);
          this.router.navigate(['/userList']);  // Điều hướng về trang danh sách user sau khi tạo thành công
        },
        (error: any) => {
          console.error('Error creating user:', error);
        }
      );
    }
  }
  addUser() {
    // Logic để thêm người dùng
    console.log("User added!");
    // Sử dụng type assertion để cho TypeScript biết rằng modal() là một phương thức hợp lệ
    ($('#addUserModal') as any).modal('hide'); // Sử dụng type assertion
}
 
}
