import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: any[] = [];
  currentUserPermissions: string[] = [];
  constructor(private userService: UserService, private userAuthService:UserAuthService) { }

  ngOnInit(): void {
    // this.currentUserPermissions = this.userAuthService.getCurrentUserPermissions();


    this.userService.getUsers().subscribe((data: any[]) => {
      this.users = data;
    }, error => {
      console.error('Error fetching users', error);
    });
  }

  hasPermission(permission: string): boolean {
    return this.currentUserPermissions.includes(permission);
  }
}
