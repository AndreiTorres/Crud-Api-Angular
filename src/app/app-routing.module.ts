import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrosComponent } from './libros/libros.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path:'libros',
    component: LibrosComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path:"login", 
    component:LoginComponent
  },
  {
    path:'', 
    redirectTo:'/login', 
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
