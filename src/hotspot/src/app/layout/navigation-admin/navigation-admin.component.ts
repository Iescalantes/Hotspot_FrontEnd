import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-navigation-admin',
  templateUrl: './navigation-admin.component.html',
  styleUrls: ['./navigation-admin.component.scss']
})
export class NavigationAdminComponent implements AfterViewInit {
 
  ngAfterViewInit(): void {
    document.getElementById('icon1')?.addEventListener('click',this.cerrarSesion);
  }


  
  cerrarSesion(){
    
    localStorage.removeItem("tipo");
    localStorage.removeItem("email");
    localStorage.removeItem("tipo");
    localStorage.setItem("loggedUser", 'n');

  };

}
