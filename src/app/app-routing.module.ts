import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';

const routes: Routes = [
  {path:'admin',loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  {path: 'vitrine', loadChildren: () => import('./vitrine-public/vitrine-public.module').then(m => m.VitrinePublicModule)},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: 'vitrine'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
