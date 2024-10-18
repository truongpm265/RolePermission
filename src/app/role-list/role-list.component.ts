// role-list.component.ts
import { Component, OnInit } from '@angular/core';
import { RoleService } from '../_services/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  roles: any[] = [];

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getAllRoles().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  deleteRole(roleId: string): void {
    if (confirm('Are you sure you want to delete this role?')) {
      this.roleService.deleteRole(roleId).subscribe(
        (response) => {
          console.log('Role deleted successfully:', response);
          this.loadRoles(); // Reload roles after deletion
        },
        (error) => {
          console.error('Error deleting role:', error);
        }
      );
    }
  }
}
