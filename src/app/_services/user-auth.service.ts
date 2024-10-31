import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Interface cho Role
interface Permission {
  name: string;
}

interface Role {
  name: string;
  permissions: Permission[];
}

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  public setRoles(roles: Role[]) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("roles", JSON.stringify(roles));
    }
  }

  public getRoles(): Role[] {
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

  public setPermissions(permissions: string[]) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("permissions", JSON.stringify(permissions));
    }
  }

  public getPermissions(): string[] {
    if (isPlatformBrowser(this.platformId)) {
      const permissions = localStorage.getItem('permissions');
      return permissions ? JSON.parse(permissions) : [];
    }
    return [];
  }

  public getFunctions(): string[]{
    if (isPlatformBrowser(this.platformId)) {
      const functions = localStorage.getItem('functions');
      return functions ? JSON.parse(functions) : [];
    }
    return [];
  }

  public clear() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

  public isLoggedIn(): boolean {
    const roles = this.getRoles();
    const token = this.getToken();
    return roles.length > 0 && token !== null;
  }
}
