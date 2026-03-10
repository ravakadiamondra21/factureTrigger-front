import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditComponent } from './features/audit/audit.component';
import { CreateUserComponent } from './features/create-user/create-user.component';
import { CrudUserComponent } from './features/crud-user/crud-user.component';
import { LoginAdminComponent } from './features/login-admin/login-admin.component';
import { LoginUserComponent } from './features/login-user/login-user.component';
import { MainComponent } from './features/main/main.component';

const routes: Routes = [
  { path: '', redirectTo: 'loginAdmin', pathMatch: 'full' },
  
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'loginUser', component: LoginUserComponent },
      { path: 'loginAdmin', component: LoginAdminComponent },
      { path: 'audit', component: AuditComponent },
      { path: 'signinUser', component: CreateUserComponent },
      { path: 'crudUser', component: CrudUserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
