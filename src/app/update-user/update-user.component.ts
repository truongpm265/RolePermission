import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { RoleService } from '../_services/role.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user: any = { username: '', email: '', password: '', roles: [] };
  roles: any[] = [];
  userId: number = 0;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.loadRoles(); // Load roles first
    this.loadUser(); // Then load the user
  }

  loadUser() {
    this.userService.getUserById(this.userId).subscribe(
      (user) => {
        this.user = user;
        // Đánh dấu các vai trò đã được chọn
        this.roles.forEach(role => {
          role.selected = this.user.roles.some((ur: { id: any; }) => ur.id === role.name); 
        });
      },
      (error) => {
        console.error('Error fetching user:', error);
        alert('Could not load user details. Please try again later.');
      }
    );
  }
  loadRoles() {
  this.roleService.getRoles().subscribe(
    (roles) => {
      this.roles = roles;
    },
    (error) => {
      console.error('Error fetching roles:', error);
      alert('Could not load roles. Please try again later.');
    }
  );
}

  onSubmit() {
    // Lấy danh sách role names từ các role đã chọn
    const selectedRoleNames = this.user.roles.map((role: { name: string; }) => role.name);
  
    const userToUpdate = {
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      roles: selectedRoleNames 
    };
  
    this.userService.updateUser(this.userId, userToUpdate).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        this.router.navigate(['/userList']);
      },
      (error) => {
        console.error('Error updating user:', error);
        alert('An error occurred while updating the user. Please try again later.');
      }
    );
  }
  
}
