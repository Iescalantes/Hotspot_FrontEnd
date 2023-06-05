import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-navigation-business',
  templateUrl: './navigation-business.component.html',
  styleUrls: ['./navigation-business.component.scss']
})
export class NavigationBusinessComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    document.getElementById('icon1')?.addEventListener('click',this.cerrarSesion);
  }


  
  cerrarSesion(){
    
    localStorage.clear();
    localStorage.setItem("loggedUser", 'n');

  };

}
