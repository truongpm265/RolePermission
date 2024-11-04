import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppFunctionService } from '../_services/app-function.service';
import { AppFunction } from '../models/app-function.model';
import { Permission } from '../models/user-details.model';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-app-functions',
  templateUrl: './app-functions.component.html',
  styleUrl: './app-functions.component.css'
})
export class AppFunctionsComponent {
  functionForm: FormGroup;
  functions: AppFunction[] = [];
  permissions: Permission[] = []; // Tất cả permissions
  selectedPermissions: Set<String> = new Set(); // Set lưu trữ permissions đã chọn
  selectedFunction: AppFunction | null = null;
  
  constructor(
    private fb: FormBuilder,
    private functionService: AppFunctionService,
    public userService:UserService
  ) {
    this.functionForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.loadFunctions();
    this.loadPermissions();
  }

  loadPermissions(): void {
    this.functionService.getPermissions().subscribe((data: Permission[]) => {
      this.permissions = data;
    });
  }

  loadFunctions(): void {
    this.functionService.getFunctions().subscribe((data: AppFunction[]) => {
      this.functions = data;
    });
  }

  addFunction(): void {
    const newFunction = {
      ...this.functionForm.value,
      permissions: Array.from(this.selectedPermissions) // Chuyển đổi Set thành mảng
    };
    this.functionService.createFunction(newFunction).subscribe(response => {
      console.log('Function added successfully:', response);
      this.loadFunctions(); // Tải lại danh sách functions
      this.functionForm.reset(); // Đặt lại form sau khi thêm mới
    });
  }

  updateFunction(): void {
    if (this.selectedFunction) {
      const updatedFunction = {
        ...this.functionForm.value,
        permissions: Array.from(this.selectedPermissions)
      };
      this.functionService.updateFunction(this.selectedFunction.id, updatedFunction).subscribe(response => {
        console.log('Function updated successfully:', response);
        this.loadFunctions();
      });
    }

  }

  

  selectFunction(func: AppFunction): void {
    this.selectedFunction = func;
    this.functionForm.patchValue({
      name: func.name,
      description: func.description
    });

    // Lấy permissions của function đã chọn và tích sẵn
    this.functionService.getPermissionsByFunctionId(func.id).subscribe((perms: Permission[]) => {
      console.log('Permissions for function:', perms); // Kiểm tra dữ liệu
      this.selectedPermissions.clear();
      perms.forEach(permission => {
        this.selectedPermissions.add(permission.name); // Thay permission.name bằng permission.id nếu bạn muốn sử dụng ID
      });
    });
  }


  onPermissionChange(event: Event, permissionId: String): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedPermissions.add(permissionId);
    } else {
      this.selectedPermissions.delete(permissionId);
    }
  }

  deleteRole(functionId: Number): void {
    if (confirm('Are you sure you want to delete this function?')) {
      this.functionService.deleteFunction(functionId).subscribe(
        (response) => {
          console.log('Function deleted successfully:', response);
          this.loadFunctions();
        },
        (error) => {
          console.error('Error deleting role:', error);
        }
      );
    }
  }

}
