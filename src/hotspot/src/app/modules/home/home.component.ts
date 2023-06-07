import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.RolCheckAdmin();
    setTimeout(this.Guardian, 100);
  }
/**
   * Función que modifica la vista en función a quien accede a ella.
   */
  async RolCheckAdmin() {
    let rol = localStorage.getItem('tipo');
    let logged = localStorage.getItem('loggedUser');

    if (logged == 'y' && rol == 'admin' && rol != null) {

      let body = document.getElementById('padre');
      if (body) {
        body.innerHTML = '';
        body.style.display = 'flex';

        let padre = document.getElementById('padre');
        if (padre) {
          padre.style.marginTop = '15% !important';
        }
        let div = document.createElement('div');
        div.id = 'container';
        div.className = 'card text-bg-dark col-3';
        div.style.height = '200px';
        div.style.width = '200px';

        let enlace = document.createElement('a');
        enlace.href = 'gestion-lista-peticiones';

        let img = document.createElement('img');
        //Cambiar 'ruta' por la imagen de la guindilla sin color.
        img.src = 'assets/images/GuindillaError.png';
        img.className = 'card-img';
        img.style.height = '200px';
        img.style.width = '200px';

        let overlay = document.createElement('div');
        overlay.className = 'card-img-overlay';

        let h5 = document.createElement('h5');
        h5.innerHTML = 'Peticiones';
        h5.style.color = 'Orange';
        h5.style.fontWeight = '2rem'

        overlay.appendChild(h5);
        enlace.appendChild(img);
        enlace.appendChild(overlay);
        div.appendChild(enlace);

        body.appendChild(div);

        let div2 = document.createElement('div');
        div2.id = 'container2';
        div2.className = 'card text-bg-dark col-3';
        div2.style.height = '200px';
        div2.style.width = '200px';
        let enlace2 = document.createElement('a');
        enlace2.href = 'gestion-artistas';

        let img2 = document.createElement('img');
        //Cambiar 'ruta' por la imagen de la guindilla sin color.
        img2.src = 'assets/images/GuindillaError.png';
        img2.className = 'card-img';
        img2.style.height = '200px';
        img2.style.width = '200px';

        let overlay2 = document.createElement('div');
        overlay2.className = 'card-img-overlay';

        let h52 = document.createElement('h5');
        h52.innerHTML = 'Artistas';
        h52.style.color = 'Orange';
        h52.style.fontWeight = '2rem'

        overlay2.appendChild(h52);
        enlace2.appendChild(img2);
        enlace2.appendChild(overlay2);
        div2.appendChild(enlace2);


        div.style.marginLeft = 'auto';
        div.style.marginRight = 'auto';
        div.style.marginTop = '2%';
        div2.style.marginTop = '2%';
        div2.style.marginLeft = 'auto'
        div2.style.marginRight = 'auto'
        body.appendChild(div2);
        body.style.textAlign = 'center'

      }

    };
  };

  /**
   * Función para almacenar el ID del festival al pinchar en él.
   */
  async Guardian() {

    let enlaces = document.getElementsByClassName('btn-secondary');

    for (let i = 0; i < enlaces.length; i++) {
      let element = enlaces[i]

      element?.addEventListener('click', function (evt) {
        let nombre = (evt.currentTarget as HTMLElement).getAttribute("name") || "No se ha podido cargar";
        localStorage.setItem('IDFestival', nombre);
      })
    }
  };

}
