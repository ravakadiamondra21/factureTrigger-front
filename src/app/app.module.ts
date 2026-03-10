import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './features/main/main.component';
import { LoginAdminComponent } from './features/login-admin/login-admin.component';
import { AuditComponent } from './features/audit/audit.component';
import { CreateUserComponent } from './features/create-user/create-user.component';
import { LoginUserComponent } from './features/login-user/login-user.component';
import { CrudUserComponent } from './features/crud-user/crud-user.component';
import { InterceptorService } from './core/services/interceptor/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginAdminComponent,
    AuditComponent,
    CreateUserComponent,
    LoginUserComponent,
    CrudUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
