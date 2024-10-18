import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './_auth/auth.guard';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {path:'userList',component:UserListComponent,canActivate:[AuthGuard], data:{roles:['ADMIN','STAFF','USER']}},
  {path:'home',component:HomeComponent},
  {path:'admin',component:AdminComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']}},
  {path:'user',component:UserComponent, canActivate:[AuthGuard], data:{roles:['USER','ADMIN']}},
  {path:'login',component:LoginComponent},
  {path:'forbidden',component:ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
