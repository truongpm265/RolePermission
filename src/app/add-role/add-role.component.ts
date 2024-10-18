// add-role.component.ts
import { Component, OnInit } from '@angular/core';
import { RoleService } from '../_services/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  role: any = { name: '', description: '', permissions: [] };
  permissions: any[] = [];

  constructor(private roleService: RoleService, private router: Router) {}

  ngOnInit(): void {
    this.loadPermissions();
  }

  loadPermissions() {
    this.roleService.getPermissions().subscribe(
      (permissions) => {
        this.permissions = permissions.map(permission => ({ ...permission, selected: false })); // Initialize `selected` property
      },
      (error) => {
        console.error('Error fetching permissions:', error);
        alert('Could not load permissions. Please try again later.');
      }
    );
  }

  onSubmit() {

    const selectedPermissions = this.permissions.filter(p => p.selected).map(p => p.name); 
  
    const roleToCreate = {
      ...this.role,
      permissions: selectedPermissions,
    };
  
    this.roleService.createRole(roleToCreate).subscribe(
      (response) => {
        console.log('Role created successfully:', response);
        this.router.navigate(['/roles']); 
      },
      (error) => {
        console.error('Error creating role:', error);
        alert('An error occurred while creating the role. Please try again later.');
      }
    );
  }
}
