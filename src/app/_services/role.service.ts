import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = 'http://localhost:8080';  // Đường dẫn tới API của bạn

  constructor(private http: HttpClient) { }

  
  getRoleById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/roles/${id}`);
  }
  getRoleByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/roles/${name}`);
  }

  getPermissions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/permissions`); // Assuming you have an endpoint to get permissions
  }

  // Method to create a new role
  createRole(role: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/roles/create`, role);
  }

  updateRole(id: string, role: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/roles/update/${id}`, role);
  }

  getAllRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/roles/get-all`); 
  }

  deleteRole(roleId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/roles/${roleId}`);
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/roles/get-all`); // Assuming you have an endpoint to get permissions
  }
  

}
