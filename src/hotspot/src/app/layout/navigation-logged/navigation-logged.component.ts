import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-navigation-logged',
  templateUrl: './navigation-logged.component.html',
  styleUrls: ['./navigation-logged.component.scss']
})
export class NavigationLoggedComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    document.getElementById('icon1')?.addEventListener('click', this.cerrarSesion);
  }



  cerrarSesion() {

    localStorage.removeItem("tipo");
    localStorage.removeItem("email");
    localStorage.removeItem("tipo");
    localStorage.setItem("loggedUser", 'n');

  };

}
