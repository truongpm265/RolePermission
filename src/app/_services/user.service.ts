import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from './user-auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { UserSearchRequest } from '../search/search.component';
// Define a User interface for better type safety
export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  roles?: any[]; 
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userFunctions: Set<string> = new Set();
  private readonly PATH_OF_API = "http://localhost:8080";
  private requestHeader = new HttpHeaders({
    "No-Auth": "True" // Consider applying this only for login if needed
  });

  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService, private authService: AuthService) { }

  public login(loginData: NgForm): Observable<any> {
    return this.httpClient.post(`${this.PATH_OF_API}/auth/log-in`, loginData, { headers: this.requestHeader });
  }

  public roleMatch(allowedRoles: string[]): boolean {
    const userRoles = this.authService.getUserRoles();
    return userRoles.some(role => allowedRoles.includes(role));
  }
  
  public functionMatch(allowedFunctions: string[]): boolean {
    const userFunctions = this.authService.getUserFunctions();
    return userFunctions.some(func => allowedFunctions.includes(func));
  }
  public permissionMatch(allowedPermissions: string[]): boolean {
    const userPermissions = this.authService.getPermissions();
    return userPermissions.some(permissions => allowedPermissions.includes(permissions));
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.PATH_OF_API}/users`);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.PATH_OF_API}/users/create-user`, user);
  }

  deleteUser(userId: number): Observable<string> {
    return this.httpClient.delete(`${this.PATH_OF_API}/users/delete/${userId}`, { responseType: 'text' });
  }


  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.PATH_OF_API}/users/${id}`);
  }


  updateUser(id: number, user: any): Observable<void> {
    return this.httpClient.put<void>(`${this.PATH_OF_API}/users/update/${id}`, user)
  }
  getUserFunctions(): string[] {
    const functions = localStorage.getItem('functions');
    return functions ? JSON.parse(functions) : [];
  }

  searchUsers(request: UserSearchRequest): Observable<User[]> {
    return this.httpClient.post<User[]>(`${this.PATH_OF_API}/users/search`, request);
  }

}
