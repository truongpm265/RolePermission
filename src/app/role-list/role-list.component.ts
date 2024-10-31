// role-list.component.ts
import { Component, OnInit } from '@angular/core';
import { RoleService } from '../_services/role.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../models/role.model';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  roles: any[] = [];
  roleForm: FormGroup<any>;

  constructor(private roleService: RoleService, private fb: FormBuilder) {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      functions: this.fb.array([]) // Array of functions
    });
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }
  get functions(): FormArray {
    return this.roleForm.get('functions') as FormArray;
  }
  addFunction(): void {
    this.functions.push(this.fb.group({
      id: [null], // assuming ID will be auto-generated or not needed
      name: ['', Validators.required],
      description: ['']
    }));
  }

  removeFunction(index: number): void {
    this.functions.removeAt(index);
  }

  onSubmit(): void {
    if (this.roleForm.valid) {
      const newRole: Role = this.roleForm.value;
      this.roleService.createRole(newRole).subscribe((createdRole) => {
        this.roles.push(createdRole); // Update the list
        this.roleForm.reset(); // Reset form
      });
    }
  }

  // loadRoles(): void {
  //   this.roleService.getAllRoles().subscribe(
  //     (data) => {
  //       this.roles = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching roles:', error);
  //     }
  //   );
  // }

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
