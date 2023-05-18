import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-vista-artista',
  templateUrl: './vista-artista.component.html',
  styleUrls: ['./vista-artista.component.scss']
})
export class VistaArtistaComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.chargeInfo();
    setTimeout(this.Guardian, 100);
  }

  async chargeInfo() {
    let id_artista = localStorage.getItem('IDArtista');


    const URL = "http://localhost:5000/artistas/" + id_artista;

    const response = await fetch(URL
    ).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return "error"
    }).then(data => {
      let artista = data;
      let nombre = document.getElementById('nombre');
      let alias = document.getElementById('alias');
      let desc = document.getElementById('desc');
      let generos = document.getElementById('generos');
      if (nombre && alias && desc && generos) {
        nombre.innerHTML = artista.nombre;
        alias.innerHTML = artista.apodo;
        desc.innerHTML = artista.descripcion;
        generos.innerHTML = artista.generos;
        let festis = data.festivales;
        let festivales = document.getElementsByClassName('enlaces');
        this.Megustas_Status(data._id);

        if (festis.length < 1) {

          for (let i = 0; i < festivales.length; i++) {
            const element = festivales[i];
            element.innerHTML = "";
          }
          let iconos = document.getElementsByClassName('flechas');
          iconos[0].className = "";
          iconos[0].className = "";
          let aviso = document.createElement('b');
          aviso.innerHTML = 'No hay festivales que hayan contratado a este artista aún.';
          document.getElementById('festival_lista')?.appendChild(aviso);

        } else {

          let contador = 0;
          let save = 0;

          for (let i = save; i < festivales.length; i++) {

            if (i < festis.length) {

              const URL = "http://localhost:5000/festivales/" + festis[i];

              const response = fetch(URL
              ).then(response => {
                if (response.status === 200) {
                  return response.json();
                }
                return "error"
              }).then(data => {
                festivales[i].setAttribute('name', data._id);
                festivales[i].innerHTML = data.foto;
                festivales[i].setAttribute('href', 'vista-festival');

              })
                .catch(error => {
                  console.error("Error getting fest data:", error);
                });

            } else {

              festivales[i].innerHTML = "";

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
    let festivales = document.getElementsByClassName('festival');

    for (let i = 0; i < festivales.length; i++) {
      let element = festivales[i]

      element?.addEventListener('click', function (evt) {
        let nombre = (evt.currentTarget as HTMLElement).getAttribute("name") || "No se ha podido cargar";
        localStorage.setItem('IDFestival', nombre);
      })
    }
  };

  async Megustas_Status(id_artista: String) {
    if (localStorage.getItem('loggedUser') == 'y') {
      let estado = document.getElementById('estado_megusta');
      let guardado = false;
      let email_usuario = localStorage.getItem('email');
      let posicion = 0;

      const URL = "http://localhost:5000/users/email/" + email_usuario;

      const response = await fetch(URL
      ).then(response => {
        if (response.status === 200) {
          return response.json();
        }
        return "error"
      }).then(data => {

        if (data[0].favArts.length > 0) {
          for (let i = 0; i < data[0].favArts.length; i++) {
            const element = data[0].favArts[i];
            if (element == id_artista && estado) {
              guardado = true;
              posicion = i;
            }
          }
        }

        if (!guardado && estado) {
          estado.className = "bi bi-heart";
          estado.addEventListener("click", async function (evt) {
            (evt.currentTarget as HTMLElement).className = "bi bi-heart-fill";
            // Aquí va el put o update pa actualizar el bicho
            let artists = data[0].favArts;
            artists.push(localStorage.getItem('IDArtista'));

            let URL = 'http://localhost:5000/users/' + data[0]._id;
            const response = await fetch(URL, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ password: data[0].password, nombre: data[0].nombre, email: data[0].email, fechanacimiento: data[0].fechanacimiento, followed: data[0].followed, favArts: artists, favFests: data[0].favFests, foto: data[0].foto, tipo: data[0].tipo })
            }).then(response => {
              if (response.status === 200) {
                window.location.reload();
              } else {
                console.log('Error añadiendo el artista')
              }
            }).catch(error => {
              console.error("Error adding an artist:", error);
            });

          })
        } else if (guardado && estado) {
          estado.className = "bi bi-heart-fill";
          estado.addEventListener("click", async function (evt) {
            (evt.currentTarget as HTMLElement).className = "bi bi-heart";
            // Aquí va el put o update pa actualizar el bicho
            let artists = data[0].favArts;
            artists.splice(posicion, 1);

            let URL = 'http://localhost:5000/users/' + data[0]._id;
            const response = await fetch(URL, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ password: data[0].password, nombre: data[0].nombre, email: data[0].email, fechanacimiento: data[0].fechanacimiento, followed: data[0].followed, favArts: artists, favFests: data[0].favFests, foto: data[0].foto, tipo: data[0].tipo })
            }).then(response => {
              if (response.status === 200) {
                window.location.reload();
              } else {
                console.log('Error eliminando el artista')
              }
            }).catch(error => {
              console.error("Error deleting an artist:", error);
            });
          })
        }

      })
        .catch(error => {
          console.error("Error getting artist data:", error);
        });

    }
  }

}
