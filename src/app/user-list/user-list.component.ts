import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserSearchRequest } from '../search/search.component';
import { RoleService } from '../_services/role.service';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  @ViewChild('excelFileInput') excelFileInput!: ElementRef;
  users: any[] = [];
  roles: any[] = [];
  currentUserPermissions: string[] = [];
  searchRequest: UserSearchRequest = {};
  constructor(private userService: UserService, 
    private userAuthService: UserAuthService, 
    private router:Router, 
    private http: HttpClient,
    private roleService: RoleService

  ) { }

  ngOnInit(): void {
    this.loadRoles();
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

  updateUser(userId: number) {
    this.router.navigate(['/update-user', userId]);
  }

  triggerFileInputClick(): void {
    this.excelFileInput.nativeElement.click();
  }

  importExcelFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadExcelFile(file);
    }
  }

  uploadExcelFile(file: File): void {
    const formData = new FormData();
    formData.append('file', file);

    this.http.post('http://localhost:8080/excel/import', formData, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log('File uploaded and processed successfully:', response);
          alert("File uploaded and processed successfully!");
          this.getAllUsers();
          this.router.navigate(['/userList']); 
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error uploading file:', error.message);
          alert("An error occurred while uploading the file. Please try again.");
        }
      });
  }

  searchUsers(): void {
    this.userService.searchUsers(this.searchRequest).subscribe({
      next: (users) => {
        this.users = users; // Cập nhật danh sách người dùng với kết quả tìm kiếm
      },
      error: (err) => {
        console.error('Error searching users', err);
      }
    });
  }
  loadRoles(): void {
    this.roleService.getRoles().subscribe((data: any[]) => {
      this.roles = data; // Giả sử data là danh sách các vai trò
    });
  }
  
}
