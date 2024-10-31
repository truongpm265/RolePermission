import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = 'http://localhost:8080';  // Đường dẫn tới API của bạn

  constructor(private http: HttpClient) { }


  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/roles/get-all`);
  }

  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.baseUrl}/roles/create`, role);
  }
  getRoleByName(name: string): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/roles/${name}`);
  }
  updateRole(name: string, role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.baseUrl}/roles/update/${name}`, role);
  }

  deleteRole(name: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/roles/${name}`);
  }


  getPermissions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/permissions`); // Assuming you have an endpoint to get permissions
  }

  getFunction(): Observable<any[]>{
    return  this.http.get<any[]>(`${this.baseUrl}/functions/get-all`);
  }



}
