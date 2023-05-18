import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DynamicComponentDirective } from 'src/app/directives/dynamic-component.directive';
import { NavigationAdminComponent } from '../navigation-admin/navigation-admin.component';
import { NavigationBusinessComponent } from '../navigation-business/navigation-business.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { NavigationLoggedComponent } from '../navigation-logged/navigation-logged.component';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})

export class SkeletonComponent implements AfterViewInit {

  @ViewChild(DynamicComponentDirective,{static:true}) dynamic!:DynamicComponentDirective;

  ngAfterViewInit(): void {

    let navigation;
    if(localStorage.getItem("loggedUser") == "y" && localStorage.getItem('soyempresa') == 'y' ){
      navigation = 2;
    }else if (localStorage.getItem("loggedUser") == "y" && localStorage.getItem("tipo") == "cliente"){
      navigation = 3;
    }else if (localStorage.getItem("loggedUser") == "y" && localStorage.getItem("tipo") == "admin"){
      navigation = 1;
    }else{
      navigation = 0;
    };

    this.generateComponent(navigation);
  }

  generateComponent(id: number){

    const ViewContainerRef = this.dynamic.ViewContainerRef;
    ViewContainerRef.clear();
    const componentRef = ViewContainerRef.createComponent<any>(this.navigations[id].component);

  };

  navigations = [
    {component: NavigationComponent},
    {component: NavigationAdminComponent},
    {component: NavigationBusinessComponent},
    {component: NavigationLoggedComponent}
  ];

}
