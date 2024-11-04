import { Component } from '@angular/core';

import { User, UserService } from '../_services/user.service';

export interface UserSearchRequest {
  name?: string;
  email?: string;
  gender?: string;
  role?:string
}


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchRequest: UserSearchRequest = {};
  users: User[] = [];

  constructor(private userService: UserService) {}

  searchUsers() {
    this.userService.searchUsers(this.searchRequest).subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }

}
