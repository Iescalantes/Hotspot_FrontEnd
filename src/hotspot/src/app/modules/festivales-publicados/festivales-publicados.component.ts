import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-festivales-publicados',
  templateUrl: './festivales-publicados.component.html',
  styleUrls: ['./festivales-publicados.component.scss']
})
export class FestivalesPublicadosComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.RolCheckBusiness();
    this.TodosLosFestis();
  }


  /**
   * Función para cargar los festivales publicados que pertenezcan a la empresa con sesión iniciada.
   */
  async TodosLosFestis() {
    const URL = "https://hotspotbackend-production.up.railway.app/empresas/email/" + localStorage.getItem('email');

    const response = await fetch(URL
    ).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return "error"
    }).then(data => {
      let fests = data[0].festivales;

      for (let i = 0; i < fests.length; i++) {

        const URL = "https://hotspotbackend-production.up.railway.app/festivales/" + fests[i];

        const response = fetch(URL
        ).then(response => {
          if (response.status === 200) {
            return response.json();
          }
          return "error"
        }).then(data => {
          
          const element = data;


          if (element.confirmado == true) {

            let enlace = document.createElement('a');
            enlace.className = "enlaces";
            enlace.href = "vista-festival"
            enlace.setAttribute('name', fests[i]);
            enlace.style.textDecoration = 'none';
            enlace.style.color = '#571AFF';

            let card = document.createElement('div');
            card.className = 'card mb-3';
            card.style.maxWidth = '540px';
            card.style.margin = 'auto';

            let row = document.createElement('div');
            row.className = "row g-0";

            let col = document.createElement('div');
            col.className = "col-md-4";

            let img = document.createElement('img');
            img.className = "img-fluid rounded-start"
            img.src = element.foto;
            img.style.height = '400px';
            img.style.width = '500px';
            img.style.objectFit = 'cover';
            img.alt = "Foto del festival";

            let col2 = document.createElement('div');
            col2.className = "col-md-8";

            let body = document.createElement('div');
            body.className = "card-body";

            let h5 = document.createElement('h5');
            h5.className = 'card-title'
            h5.innerHTML = element.nombre;

            let p = document.createElement('p');
            p.className = 'card-text';
            p.innerHTML = element.descripcion;

            let p2 = document.createElement('p');
            p2.className = 'card-text';

            let small = document.createElement('small');
            small.className = "text-body-secondary";
            small.innerHTML = 'CONFIRMADO';
            small.style.color = 'green';


            if (card && row && col && img && col2 && body && h5 && p && p2 && small) {
              p2.appendChild(small);
              body.appendChild(h5);
              body.appendChild(p);
              body.appendChild(p2);
              col2.appendChild(body);
              col.appendChild(img);
              row.appendChild(col);
              row.appendChild(col2);
              card.appendChild(row);
              enlace.appendChild(card)
              document.getElementById('listado_festivales')?.appendChild(enlace);
            };

          } else {

            let card = document.createElement('div');
            card.className = 'card mb-3';
            card.style.maxWidth = '540px';
            card.style.margin = 'auto';
            card.style.textDecoration = 'none';
            card.style.color = '#571AFF';

            let row = document.createElement('div');
            row.className = "row g-0";

            let col = document.createElement('div');
            col.className = "col-md-4";

            let img = document.createElement('img');
            img.className = "img-fluid rounded-start"
            img.src = element.foto;
            img.style.height = '400px';
            img.style.width = '500px';
            img.style.objectFit = 'cover';
            img.alt = "Foto del festival";

            let col2 = document.createElement('div');
            col2.className = "col-md-8";

            let body = document.createElement('div');
            body.className = "card-body";

            let h5 = document.createElement('h5');
            h5.className = 'card-title'
            h5.innerHTML = element.nombre;

            let p = document.createElement('p');
            p.className = 'card-text';
            p.innerHTML = element.descripcion;

            let p2 = document.createElement('p');
            p2.className = 'card-text';

            let small = document.createElement('small');
            small.className = "text-body-secondary";
            small.innerHTML = 'NO CONFIRMADO';
            small.style.color = 'red';


            if (card && row && col && img && col2 && body && h5 && p && p2 && small) {
              p2.appendChild(small);
              body.appendChild(h5);
              body.appendChild(p);
              body.appendChild(p2);
              col2.appendChild(body);
              col.appendChild(img);
              row.appendChild(col);
              row.appendChild(col2);
              card.appendChild(row);
              document.getElementById('listado_festivales')?.appendChild(card);
            };
          }
          this.Guardian();
        })
          .catch(error => {
            console.error("Error getting fest data:", error);
          });

      }
    })
      .catch(error => {
        console.error("Error getting fest data:", error);
      });
  }

  /**
   * Función que añade eventos a las tarjetas para guardar en localStorage el ID del festival al que queremos ir.
   */
  async Guardian() {
    let enlaces = document.getElementsByClassName('enlaces');

    for (let i = 0; i < enlaces.length; i++) {
      let element = enlaces[i]

      element?.addEventListener('click', function (evt) {
        let nombre = (evt.currentTarget as HTMLElement).getAttribute("name") || "No se ha podido cargar";
        localStorage.setItem('IDFestival', nombre);
      })
    }
  };

  /**
   * Función que bloquea el acceso a usuarios que no deben.
   */
  async RolCheckBusiness() {
    let rol = localStorage.getItem('loggedEmpresa');
    let logged = localStorage.getItem('loggedUser');


    if (logged != 'y' || rol != 'y' || rol == null) {

      let body = document.getElementsByTagName('body');
      if (body) {
        body[0].innerHTML = '';
        body[0].style.width = '80%';
        body[0].style.height = '80%';
        body[0].style.margin = 'auto';
        body[0].style.marginTop = '5%';



        let div = document.createElement('div');
        div.style.display = 'flex';
        div.id = 'container';

        let img = document.createElement('img');
        img.src = 'assets/images/GuindillaError.png';
        let p = document.createElement('p');
        let h2 = document.createElement('h1');
        h2.innerHTML = '¡Oops! Parece que no tienes acceso para estar aquí.';
        h2.style.color = 'white'
        let h3 = document.createElement('h3');
        h3.style.color = 'white'
        h3.innerHTML = 'Serás redirigid@ a la página de inicio.';

        p.appendChild(h2);
        p.appendChild(h3);
        div.appendChild(img);
        div.appendChild(p);
        body[0].appendChild(div);


        setTimeout(function temporizador() { window.location.href = '' }, 3000);
      }

    };
  };
}
