import { AfterViewInit,Component } from '@angular/core';

@Component({
  selector: 'app-peticion',
  templateUrl: './peticion.component.html',
  styleUrls: ['./peticion.component.scss']
})
export class PeticionComponent implements AfterViewInit{
  
  ngAfterViewInit(): void {
    this.Guardian();
  }

  async Guardian() {
    let enlaces = document.getElementsByClassName('enlaces');

      for (let i = 0; i < enlaces.length; i++) {
        let element = enlaces[i]

        element?.addEventListener('click', function(evt){
          let nombre = (evt.currentTarget as HTMLElement).getAttribute("name") || "No se ha podido cargar";
          localStorage.setItem('clase', nombre);
        })
      }
  };

}
