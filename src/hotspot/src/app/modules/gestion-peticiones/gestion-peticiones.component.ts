import { AfterViewInit,Component } from '@angular/core';

@Component({
  selector: 'app-gestion-peticiones',
  templateUrl: './gestion-peticiones.component.html',
  styleUrls: ['./gestion-peticiones.component.scss']
})
export class GestionPeticionesComponent implements AfterViewInit{

  ngAfterViewInit(): void {
    this.chargeInfo();
    setTimeout(this.Guardian,100);
    setTimeout(this.alta,50);
  }




  async chargeInfo() {
    let id_festival = localStorage.getItem('IDFestival');
    const URL = "http://localhost:5000/festivales/" + id_festival;

    const response = await fetch(URL
    ).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return "error"
    }).then(data => {
      let festi = data;
      let nombre = document.getElementById('nombre');
      let ubicacion = document.getElementById('ubicacion');
      let desc = document.getElementById('desc');

      if (nombre && ubicacion && desc) {
        nombre.innerHTML = festi.nombre;
        ubicacion.innerHTML = festi.localizacion;
        desc.innerHTML = festi.descripcion;
        let artistas = data.artistas;
        let enlaces = document.getElementsByClassName('enlaces');


        if (artistas.length < 1) {

          for (let i = 0; i < enlaces.length; i++) {
            const element = enlaces[i];
            element.innerHTML = "";
          }
          let iconos = document.getElementsByClassName('flechas');
          iconos[0].className = "";
          iconos[0].className = "";
          let aviso = document.createElement('b');
          aviso.innerHTML = 'No hay artistas contratados para este festival aún.';
          document.getElementById('artista_lista')?.appendChild(aviso);

        } else {

          let contador = 0;
          let save = 0;

          for (let i = save; i < enlaces.length; i++) {
            
            if (i < artistas.length) {

              const URL = "http://localhost:5000/artistas/" + artistas[i];

              const response = fetch(URL
              ).then(response => {
                if (response.status === 200) {
                  return response.json();
                }
                return "error"
              }).then(data => {
                enlaces[i].setAttribute('name',data._id);
                enlaces[i].innerHTML = data.foto;
                enlaces[i].setAttribute('href','vista-artista');

              })
                .catch(error => {
                  console.error("Error getting fest data:", error);
                });

            } else {

              enlaces[i].innerHTML = "";

            }

            contador++;

            if (contador == 4) {
              contador = 0;
              save = i;
              break;
            };

          }
        }
      }


      
    })
      .catch(error => {
        console.error("Error getting fest data:", error);
      });
  };


  async Guardian() {
    let enlaces = document.getElementsByClassName('enlaces');
  
      for (let i = 0; i < enlaces.length; i++) {
        let element = enlaces[i]
  
        element?.addEventListener('click', function(evt){
          let nombre = (evt.currentTarget as HTMLElement).getAttribute("name") || "No se ha podido cargar";
          localStorage.setItem('IDArtista', nombre);
        })
      }
  };

  async alta(){
  
let check = document.getElementById('aceptar');
let cross = document.getElementById('denegar');


    check?.addEventListener('click',function updatear() {

      const URL = "http://localhost:5000/festivales/" + localStorage.getItem('IDFestival');

      const response = fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ verificado: true })
      }).then(response => {
        window.location.href = 'gestion-lista-peticiones';
      }).catch(error => {
        console.error("Error updating the festival:", error);
      });
    });



    cross?.addEventListener('click',function deletear() {
      const URL = "http://localhost:5000/festivales/" + localStorage.getItem('IDFestival');

      const response = fetch(URL, {
        method: "DELETE"
      }).then(response => {
        window.location.href = 'gestion-lista-peticiones';
      }).catch(error => {
        console.error("Error deleting the festival:", error);
      });
    });

  };
}
