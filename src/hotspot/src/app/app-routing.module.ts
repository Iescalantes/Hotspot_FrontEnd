import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { HomeComponent } from './modules/home/home.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { LoginComponent } from './modules/login/login.component';
import { PeticionComponent } from './modules/peticion/peticion.component';
import { CatalogoComponent } from './modules/catalogo/catalogo.component';
import { VistaUsuarioComponent } from './modules/vista-usuario/vista-usuario.component';

const routes: Routes = [

  {
    path: '',
    component: SkeletonComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', component: HomeComponent },
      { path: 'register', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'peticion', component: PeticionComponent },
      { path: 'catalogo', component: CatalogoComponent },
      { path: 'vista-usuario', component: VistaUsuarioComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
