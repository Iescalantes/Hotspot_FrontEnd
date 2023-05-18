import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ModulesModule } from './modules/modules.module';
import { NavigationLoggedComponent } from './layout/navigation-logged/navigation-logged.component';
import { NavigationAdminComponent } from './layout/navigation-admin/navigation-admin.component';
import { NavigationBusinessComponent } from './layout/navigation-business/navigation-business.component';
import { DynamicComponentDirective } from './directives/dynamic-component.directive';

@NgModule({
  declarations: [
    AppComponent,
    SkeletonComponent,
    FooterComponent,
    NavigationComponent,
    NavigationLoggedComponent,
    NavigationAdminComponent,
    NavigationBusinessComponent,
    DynamicComponentDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModulesModule,
    SharedModule,
    CoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
