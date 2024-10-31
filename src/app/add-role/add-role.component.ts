// add-role.component.ts
import { Component, OnInit } from '@angular/core';
import { RoleService } from '../_services/role.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppFunction } from '../models/app-function.model';
import { Role } from '../models/role.model';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  roleForm: FormGroup;
  functions: AppFunction[] = [];

  constructor(
    private roleService: RoleService,
    // private functionService: AppFunctionService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      functions: this.fb.array([]) // holds selected functions
    });
  }

  ngOnInit(): void {
    this.loadFunctions();
  }

  loadFunctions(): void {
    this.roleService.getFunction().subscribe((data) => {
      this.functions = data;
    });
  }
  onFunctionChange(event: any, func: AppFunction): void {
    const functionsFormArray = this.roleForm.get('functions') as FormArray;
    if (event.target.checked) {
      // Add the function if it's checked
      functionsFormArray.push(this.fb.control(func));
    } else {
      // Remove the function if it's unchecked
      const index = functionsFormArray.controls.findIndex(x => x.value.id === func.id);
      functionsFormArray.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.roleForm.valid) {
      const selectedFunctions = this.roleForm.value.functions.map((func: AppFunction) => func.id);
      const newRole = {
        ...this.roleForm.value,
        functions: selectedFunctions
      };
      
      this.roleService.createRole(newRole).subscribe({
        next: (createdRole) => {
          console.log('Role created:', createdRole);
          this.roleForm.reset();
          this.router.navigate(['/roles']);
        },
        error: (err) => {
          console.error('Error creating role:', err);
        }
      });
    }
  }
}
