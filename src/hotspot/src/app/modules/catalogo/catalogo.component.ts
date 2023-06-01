import { Parser } from '@angular/compiler';
import { AfterViewInit, Component, createComponent } from '@angular/core';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements AfterViewInit {


  ngAfterViewInit() {
    this.TodosLosFestis();
    this.FestisNovedad();
    this.FestisPopus();
  }

  // Función para mostrar los 3 festivales más populares

  async FestisPopus() {
    const URL = "https://hotspotbackend-production.up.railway.app/festivales";

    const response = await fetch(URL
    ).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return "error"
    }).then(data => {

      const ordenados = data.sort((x: { megustas: number; }, y: { megustas: number; }) => y.megustas - x.megustas)

      for (let i = 0; i < 3; i++) {
        const element = ordenados[i];

        if (element.confirmado == true) {

          let lista_populares = document.getElementById('lista_populares');

          let tarjeta = document.createElement('div');
          tarjeta.className = "card col-10";
          tarjeta.style.overflow = 'hidden';

          let enlace = document.createElement('a');
          enlace.className = "enlaces";
          enlace.href = "vista-festival"
          enlace.setAttribute('name',element._id);

          let img = document.createElement('img');
          img.className = "imagencarta"
          img.src = element.foto;
          img.style.height = '250px';
          img.style.width = '300px';
          img.style.objectFit = 'cover';
          img.alt = "Foto del festival";

          let title = document.createElement('p');
          title.className = "card-text";
          title.style.color = "black"
          title.style.fontSize = "large"
          title.style.textAlign = "center"
          title.innerHTML = element.nombre

          if (lista_populares != null) {
            tarjeta.appendChild(img);
            tarjeta.appendChild(title);
            enlace.appendChild(tarjeta);
            lista_populares.appendChild(enlace);
          }
        }
      }
      this.Guardian();
    })
      .catch(error => {
        console.error("Error getting fest data:", error);
      });
  }

  //Funcion para obtener los 4 ultimos festivales novedad

  async FestisNovedad() {
    const URL = "https://hotspotbackend-production.up.railway.app/festivales";

    const response = await fetch(URL
    ).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return "error"
    }).then(data => {


      for (let i = 0; i < 4; i++) {
        const element = data[i];
        if (element.confirmado == true && element.esnovedad == true) {

          let lista_novedades = document.getElementById('lista_novedades');

          let tarjeta = document.createElement('div');
          tarjeta.className = "card col-10";
          tarjeta.style.overflow = 'hidden';

          let enlace = document.createElement('a');
          enlace.className = "enlaces";
          enlace.href = "vista-festival"
          enlace.setAttribute('name',element._id);

          let img = document.createElement('img');
          img.className = "imagencarta"
          img.src = element.foto;
          img.style.height = '250px';
          img.style.width = '300px';
          img.style.objectFit = 'cover';
          img.alt = "Foto del festival";

          let title = document.createElement('p');
          title.className = "card-text";
          title.style.color = "black"
          title.style.fontSize = "large"
          title.style.textAlign = "center"
          title.innerHTML = element.nombre

          if (lista_novedades != null) {
            tarjeta.appendChild(img);
            tarjeta.appendChild(title);
            enlace.appendChild(tarjeta);
            lista_novedades.appendChild(enlace);
          }
        }
      }

    })
      .catch(error => {
        console.error("Error getting fest data:", error);
      });
  }

  // Función para listar todos los festivales
  async TodosLosFestis() {
    const URL = "https://hotspotbackend-production.up.railway.app/festivales";

    const response = await fetch(URL
    ).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return "error"
    }).then(data => {

      for (let i = 0; i < data.length; i++) {

        const element = data[i];

        if (element.confirmado == true) {

          let lista = document.getElementById('lista');

          let tarjeta = document.createElement('div');
          tarjeta.className = "card col-10";
          tarjeta.style.overflow = 'hidden';

          let enlace = document.createElement('a');
          enlace.className = "enlaces";
          enlace.href = "vista-festival"
          enlace.setAttribute('name',element._id);

          let img = document.createElement('img');
          img.className = "imagencarta"
          img.src = element.foto;
          img.style.height = '250px';
          img.style.width = '300px';
          img.style.objectFit = 'cover';
          img.alt = "Foto del festival";

          let title = document.createElement('p');
          title.className = "card-text";
          title.style.color = "black"
          title.style.fontSize = "large"
          title.style.textAlign = "center"
          title.innerHTML = element.nombre

          if (lista != null) {
           tarjeta.appendChild(img);
            tarjeta.appendChild(title);
            enlace.appendChild(tarjeta);
            lista.appendChild(enlace);
          }
        }
      }
    })
      .catch(error => {
        console.error("Error getting fest data:", error);
      });
  }



  // Eventos para capturar el id

  async Guardian() {
    let enlaces = document.getElementsByClassName('enlaces');

      for (let i = 0; i < enlaces.length; i++) {
        let element = enlaces[i]

        element?.addEventListener('click', function(evt){
          let nombre = (evt.currentTarget as HTMLElement).getAttribute("name") || "No se ha podido cargar";
          localStorage.setItem('IDFestival', nombre);
        })
      }
  };


}