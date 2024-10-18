import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: any[] = [];
  currentUserPermissions: string[] = [];
  constructor(private userService: UserService, private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    this.currentUserPermissions = this.userAuthService.getPermissions();
    this.loadEmployees();
    this.userService.getAllUsers().subscribe((data: any[]) => {
      this.users = data;
    }, error => {
      console.error('Error fetching users', error);
    });
  }

  hasPermission(permission: string): boolean {
    return this.currentUserPermissions.includes(permission);
  }

  getAllUsers() {
    

    this.userService.getAllUsers().subscribe(data =>{
      this.users=data;
    })
  }
  //---------- using async/await to get employee list--- 
  async loadEmployees() {
    try {
      this.users = await firstValueFrom(this.userService.getAllUsers()); //firstValueFrom from rxjs thay cho .subscribe
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        (response) => {
          console.log('User deleted successfully:', response);
          this.getAllUsers();  // Tải lại danh sách người dùng sau khi xóa
        },
        (error) => {
          console.error('Error deleting user:', error);
          alert('Error deleting user: ' + error.message);  // Hiển thị lỗi chi tiết
        }
      );
    }
  }
}
