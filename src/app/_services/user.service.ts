import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from './user-auth.service';
import { Observable, catchError, throwError } from 'rxjs';

// Define a User interface for better type safety
export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  roles?: any[]; // Adjust according to your role structure
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly PATH_OF_API = "http://localhost:8080";
  private requestHeader = new HttpHeaders({
    "No-Auth": "True" // Consider applying this only for login if needed
  });

  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }

  public login(loginData: NgForm): Observable<any> {
    return this.httpClient.post(`${this.PATH_OF_API}/auth/log-in`, loginData, { headers: this.requestHeader });
  }

  public roleMatch(allowedRoles: string[]): boolean {
    const userRoles = this.userAuthService.getRoles();
    return userRoles.some(role => allowedRoles.includes(role.name));
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


  updateUser(id: number, user: any): Observable<any> {
    return this.httpClient.put(`${this.PATH_OF_API}/users/update/${id}`, user)
        .pipe(
            catchError(this.handleError) // Ensure you catch errors here
        );
}

  private handleError(error: HttpErrorResponse) {
    // Log the error to the console
    console.error('An error occurred:', error);

    // If the error is client-side or network error
    if (error.error instanceof ErrorEvent) {
      return throwError('Something bad happened; please try again later.');
    } else {
      // Server-side error
      const errorMsg = error.error.message || error.message || 'An unknown error occurred.';
      console.error('Server returned code:', error.status, 'with body:', error.error);
      return throwError(errorMsg);
    }
  }
}
