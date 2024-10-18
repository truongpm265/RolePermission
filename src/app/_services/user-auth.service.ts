import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  public setRoles(roles: any[]) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("roles", JSON.stringify(roles));
    }
  }

  public getRoles(): string[] {
    if (isPlatformBrowser(this.platformId)) {
      const roles = localStorage.getItem('roles');
      return roles ? JSON.parse(roles) : [];
    }
    return [];
  }

  public setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("token", token);
    }
  }

  public getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  public clear() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

  public isLoggedIn() {
    return this.getRoles().length > 0 && this.getToken() !== null;
  }
}
