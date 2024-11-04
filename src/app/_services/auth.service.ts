import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppFunction, Permission, UserDetails } from '../models/user-details.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
  
})
export class AuthService {
  private baseUrl = 'http://localhost:8080'; // Địa chỉ của backend
  private requestHeader = new HttpHeaders({
    "No-Auth": "True" // Consider applying this only for login if needed
  });

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = {username, password };
    console.log(body)
    return this.http.post('http://localhost:8080/auth/log-in', body ,{ headers: this.requestHeader });
  }

  getUserDetails(): Observable<UserDetails> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<UserDetails>(`http://localhost:8080/users/user-details`, { headers });
  }

  getUserRoles(): string[] {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.roles || [];
    }
    return [];
  }

  getPermissions(): string[] {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.permissions || [];
    }
    return [];
  }

  getUserFunctions(): string[] {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.functions || [];
    }
    return [];
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


}
