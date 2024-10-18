import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { RoleService } from '../_services/role.service';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user: any = { id: 0, username: '', password: '', email: '', roles: [] }; // Khởi tạo thông tin người dùng
  id: number = 0; // ID người dùng
  roles: any[] = [];
  selectedRole: any;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,  
    private router: Router,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; // Lấy ID từ route
    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data; // Gán thông tin người dùng
      this.selectedRole = this.user.roles[0]; // Gán vai trò đầu tiên cho vai trò đã chọn
    });

    this.roleService.getAllRoles().subscribe(
      (roles) => {
        this.roles = roles; // Gán danh sách vai trò
      },
      (error) => {
        console.log('Error fetching roles:', error);
      }
    );
  }

  onSubmit(): void {
    console.log('Updating user with ID:', this.id);
    console.log('User data to be sent:', this.user); // Log user data

    this.userService.updateUser(this.id, this.user).subscribe(
        (data) => {
            this.user = data;
            this.router.navigate(['/userList']);
        },
        (error) => {
            console.error('Error updating user:', error); // Log the error
            alert('Error updating user: ' + error); // Show alert with error
        }
    );
}

}

