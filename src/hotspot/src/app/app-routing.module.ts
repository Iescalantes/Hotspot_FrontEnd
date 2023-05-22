import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { HomeComponent } from './modules/home/home.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { LoginComponent } from './modules/login/login.component';
import { PeticionComponent } from './modules/peticion/peticion.component';
import { CatalogoComponent } from './modules/catalogo/catalogo.component';
import { VistaFestivalComponent } from './modules/vista-festival/vista-festival.component';
import { VistaArtistaComponent } from './modules/vista-artista/vista-artista.component';
import { MiespacioComponent } from './modules/miespacio/miespacio.component';
import { AjustesComponent } from './modules/ajustes/ajustes.component';
import { GestionListaPeticionesComponent } from './modules/gestion-lista-peticiones/gestion-lista-peticiones.component';
import { GestionPeticionesComponent } from './modules/gestion-peticiones/gestion-peticiones.component';
import { GestionArtistasComponent } from './modules/gestion-artistas/gestion-artistas.component';
import { FestivalesPublicadosComponent } from './modules/festivales-publicados/festivales-publicados.component';
import { Registration2Component } from './modules/registration2/registration2.component';
import { CatalogoartistasComponent } from './modules/catalogoartistas/catalogoartistas.component';
import { EditingInfoComponent } from './modules/editing-info/editing-info.component';
import { Login2Component } from './modules/login2/login2.component';
import { FormPeticionComponent } from './modules/form-peticion/form-peticion.component';

const routes: Routes = [

  {
    path: '',
    component: SkeletonComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', component: HomeComponent },
      { path: 'register', component: RegistrationComponent },
      { path: 'registration2', component: Registration2Component },
      { path: 'login', component: LoginComponent },
      { path: 'peticion', component: PeticionComponent },
      { path: 'catalogo', component: CatalogoComponent },
      { path: 'vista-festival', component: VistaFestivalComponent },
      { path: 'gestion-peticiones', component: GestionPeticionesComponent },
      { path: 'vista-artista', component: VistaArtistaComponent },
      { path: 'miespacio', component: MiespacioComponent },
      { path: 'ajustes', component: AjustesComponent },
      { path: 'gestion-lista-peticiones', component: GestionListaPeticionesComponent },
      { path: 'gestion-artistas', component: GestionArtistasComponent },
      { path: 'festivales-publicados', component: FestivalesPublicadosComponent }, 
      { path: 'catalogoartistas', component: CatalogoartistasComponent },
      { path: 'editing-info', component: EditingInfoComponent },
      { path: 'login2', component: Login2Component },
      { path: 'form-peticion', component: FormPeticionComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
