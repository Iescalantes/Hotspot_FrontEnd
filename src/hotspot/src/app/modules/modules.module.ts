import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MiespacioComponent } from './miespacio/miespacio.component';
import { PeticionComponent } from './peticion/peticion.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { GestionPeticionesComponent } from './gestion-peticiones/gestion-peticiones.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { FestivalesPublicadosComponent } from './festivales-publicados/festivales-publicados.component';
import { VistaFestivalComponent } from './vista-festival/vista-festival.component';
import { GestionArtistasComponent } from './gestion-artistas/gestion-artistas.component';
import { AltaFestivalComponent } from './alta-festival/alta-festival.component';
import { VistaArtistaComponent } from './vista-artista/vista-artista.component';
import { GestionListaPeticionesComponent } from './gestion-lista-peticiones/gestion-lista-peticiones.component';
import { Registration2Component } from './registration2/registration2.component';
import { Login2Component } from './login2/login2.component';
import { CatalogoartistasComponent } from './catalogoartistas/catalogoartistas.component';
import { EditingInfoComponent } from './editing-info/editing-info.component';
import { FormPeticionComponent } from './form-peticion/form-peticion.component';
import { AddArtsComponent } from './add-arts/add-arts.component';



@NgModule({
  declarations: [
    RegistrationComponent,
    HomeComponent,
    LoginComponent,
    MiespacioComponent,
    PeticionComponent,
    AjustesComponent,
    GestionPeticionesComponent,
    CatalogoComponent,
    FestivalesPublicadosComponent,
    VistaFestivalComponent,
    GestionArtistasComponent,
    AltaFestivalComponent,
    VistaArtistaComponent,
    GestionListaPeticionesComponent,
    Registration2Component,
    Login2Component,
    CatalogoartistasComponent,
    EditingInfoComponent,
    FormPeticionComponent,
    AddArtsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ModulesModule { }
