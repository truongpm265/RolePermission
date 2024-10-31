import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../_services/role.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {
  role: any = { name: '', description: '', permissions: [] };
  permissions: any[] = [];
  roleId: string = '';

  constructor(
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roleId = this.route.snapshot.params['id'];
    this.loadPermissions(); // Load permissions first
    this.loadRole(); // Then load the role
  }

  loadRole() {
    // this.roleService.getRoleById(this.roleId).subscribe(
    //   (role) => {
    //     this.role = role;
    //     this.permissions.forEach(permission => {
    //       permission.selected = this.role.permissions.some((rp: { name: any; }) => rp.name === permission.name); // Assuming permission names are used
    //     });
    //   },
    //   (error) => {
    //     console.error('Error fetching role:', error);
    //     alert('Could not load role details. Please try again later.');
    //   }
    // );
  }

  loadPermissions() {
    this.roleService.getPermissions().subscribe(
      (permissions) => {
        this.permissions = permissions.map(permission => ({ ...permission, selected: false }));
      },
      (error) => {
        console.error('Error fetching permissions:', error);
        alert('Could not load permissions. Please try again later.');
      }
    );
  }

  onSubmit() {
    // Get selected permissions
    const selectedPermissions = this.permissions.filter(p => p.selected).map(p => p.name);

    // Prepare the role to update
    const roleToUpdate = {
      ...this.role,
      permissions: selectedPermissions,
    };

    // Update role
    this.roleService.updateRole(this.roleId, roleToUpdate).subscribe(
      (response) => {
        console.log('Role updated successfully:', response);
        this.router.navigate(['/roles']);
      },
      (error) => {
        console.error('Error updating role:', error);
        alert('An error occurred while updating the role. Please try again later.');
      }
    );
  }
}
