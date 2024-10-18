import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './_auth/auth.guard';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { RoleListComponent } from './role-list/role-list.component';

const routes: Routes = [
  {path:'userList',component:UserListComponent,canActivate:[AuthGuard], data:{roles:['ADMIN','STAFF','USER']}},
  {path:'home',component:HomeComponent},
  {path:'admin',component:AdminComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']}},
  {path:'user',component:UserComponent, canActivate:[AuthGuard], data:{roles:['USER','ADMIN']}},
  {path:'login',component:LoginComponent},
  {path:'forbidden',component:ForbiddenComponent},
  {path:'create-user',component:CreateUserComponent,canActivate:[AuthGuard],data:{roles:['ADMIN']}},
  {path:'update-user/:id',component:UpdateUserComponent,canActivate:[AuthGuard],data:{roles:['ADMIN']}},
  {path:'add-role', component: AddRoleComponent},
  {path:'roles/edit/:id', component: EditRoleComponent },
  {path:'roles',component:RoleListComponent,canActivate:[AuthGuard],data:{roles:['ADMIN']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
