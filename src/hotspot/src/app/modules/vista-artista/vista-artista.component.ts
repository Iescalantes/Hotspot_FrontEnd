import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-vista-artista',
  templateUrl: './vista-artista.component.html',
  styleUrls: ['./vista-artista.component.scss']
})
export class VistaArtistaComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.chargeInfo();
  }

  async chargeInfo() {
    let id_artista = localStorage.getItem('IDArtista');
    let papelera = document.getElementById('maspalla');
    if (localStorage.getItem('tipo')!='admin' && papelera){
      papelera.innerHTML = '';
    } else{
      papelera?.addEventListener('click',this.deleteArt);
    };

    const URL = "https://hotspotbackend-production.up.railway.app/artistas/" + id_artista;

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
      let foto = document.getElementById('foto');
      if (foto && nombre && alias && desc && generos) {
        (foto as HTMLImageElement).src = artista.foto;
        (foto as HTMLImageElement).style.borderRadius = '30px';
        nombre.innerHTML = artista.nombre;
        alias.innerHTML = artista.apodo;
        desc.innerHTML = artista.descripcion;
        generos.innerHTML = artista.generos;
        let festis = data.festivales;
        let festivales = document.getElementsByClassName('enlaces');
        let festivales2 = document.getElementsByClassName('festival');
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

              const URL = "https://hotspotbackend-production.up.railway.app/festivales/" + festis[i];

              const response = fetch(URL
              ).then(response => {
                if (response.status === 200) {
                  return response.json();
                }
                return "error"
              }).then(data => {
                console.log(festivales[i])
                festivales[i].setAttribute('name', data._id);
                (festivales2[i] as HTMLImageElement).src = data.foto;
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

this.Guardian();

  };

  async Guardian() {
    let festivales = document.getElementsByClassName('enlaces');

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

      const URL = "https://hotspotbackend-production.up.railway.app/users/email/" + email_usuario;

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

        if (!guardado && estado && localStorage.getItem('tipo')!='admin') {
          estado.className = "bi bi-heart";
          estado.addEventListener("click", async function (evt) {
            (evt.currentTarget as HTMLElement).className = "bi bi-heart-fill";
            // Aquí va el put o update pa actualizar el bicho
            let artists = data[0].favArts;
            artists.push(localStorage.getItem('IDArtista'));

            let URL = 'https://hotspotbackend-production.up.railway.app/users/' + data[0]._id;
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
        } else if (guardado && estado && localStorage.getItem('tipo')!='admin') {
          estado.className = "bi bi-heart-fill";
          estado.addEventListener("click", async function (evt) {
            (evt.currentTarget as HTMLElement).className = "bi bi-heart";
            let artists = data[0].favArts;
            artists.splice(posicion, 1);

            let URL = 'https://hotspotbackend-production.up.railway.app/users/' + data[0]._id;
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



async deleteArt(){
  const URL = "https://hotspotbackend-production.up.railway.app/artistas/" + localStorage.getItem('IDArtista');

  const response = fetch(URL, {
    method: "DELETE"
  }).then(response => {
    window.location.href = 'gestion-artistas';
  }).catch(error => {
    console.error("Error deleting the artist:", error);
  });
};

}
