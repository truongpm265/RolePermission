import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  PATH_OF_API = "http://localhost:8080"
  requestHeader = new HttpHeaders(
    {
      "No-Auth": "True"
    }
  )
  constructor(private httpClient: HttpClient, private userAuthService:UserAuthService) { }

  public login(loginData:NgForm){
    return this.httpClient.post(this.PATH_OF_API + "/auth/log-in", loginData,{headers:this.requestHeader});
  }

  public roleMatch(allowedRoles: string[]): boolean {
    const userRoles: any[] = this.userAuthService.getRoles();
    let isMatch = false;
  
    if (userRoles && userRoles.length > 0) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].name === allowedRoles[j]) {
            isMatch = true;
            break; // Exit inner loop once a match is found
          }
        }
        if (isMatch) {
          break; // Exit outer loop once a match is found
        }
      }
    }
    
    return isMatch; // Return true only if a match is found
  }

  getUsers(): Observable<any> {
    return this.httpClient.get<any>(this.PATH_OF_API+ "/users");
  }
  

}
