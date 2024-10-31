import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppFunction } from '../models/app-function.model';
import { Permission } from '../models/user-details.model';

@Injectable({
  providedIn: 'root'
})
export class AppFunctionService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getFunctions(): Observable<AppFunction[]> {
    return this.http.get<AppFunction[]>(`${this.apiUrl}/functions/get-all`);
  }

  // Thêm một chức năng mới
  createFunction(newFunction: AppFunction): Observable<AppFunction> {
    return this.http.post<AppFunction>(`${this.apiUrl}/functions/create`, newFunction);
  }

  // Cập nhật một chức năng hiện có
  updateFunction(name: Number, newFunction: AppFunction): Observable<AppFunction> {
    return this.http.put<AppFunction>(`${this.apiUrl}/functions/update/${name}`, newFunction);
  }

  getPermissions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/permissions`); // Assuming you have an endpoint to get permissions
  }

  getPermissionsByFunctionId(functionId: Number): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.apiUrl}/functions/${functionId}/permissions`);
  }

  updatePermissions(functionId: Number, permissions: String[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/functions/${functionId}`, { permissions });
  }

  deleteFunction(id: Number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/functions/${id}`);
  }


}
