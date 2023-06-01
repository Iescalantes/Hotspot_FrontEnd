import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-vista-festival',
  templateUrl: './vista-festival.component.html',
  styleUrls: ['./vista-festival.component.scss']
})
export class VistaFestivalComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.chargeInfo();
  }

  async chargeInfo() {
    let id_festival = localStorage.getItem('IDFestival');
    const URL = "https://hotspotbackend-production.up.railway.app/festivales/" + id_festival;

    const response = await fetch(URL
    ).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return "error"
    }).then(data => {
      let festi = data;
      let foto = document.getElementById('foto');
      let nombre = document.getElementById('nombre');
      let ubicacion = document.getElementById('ubicacion');
      let desc = document.getElementById('desc');

      if (foto && nombre && ubicacion && desc) {
        (foto as HTMLImageElement).src = festi.foto;
        (foto as HTMLImageElement).style.borderRadius = '30px';
        nombre.innerHTML = festi.nombre;
        ubicacion.innerHTML = festi.localizacion;
        desc.innerHTML = festi.descripcion;
        let artistas = data.artistas;
        let enlaces = document.getElementsByClassName('enlaces');
        let artistas2 = document.getElementsByClassName('artistas');
        this.Megustas_Status(data._id);


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

              const URL = "https://hotspotbackend-production.up.railway.app/artistas/" + artistas[i];

              const response = fetch(URL
              ).then(response => {
                if (response.status === 200) {
                  return response.json();
                }
                return "error"
              }).then(data => {
                enlaces[i].setAttribute('name',data._id);
                (artistas2[i] as HTMLImageElement).src = data.foto;
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

      this.Guardian();
      
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

async Megustas_Status(id_festival: String){
  let estado = document.getElementById('estado_megusta');
  let guardado = false;
  let email_usuario = localStorage.getItem('email');
  let posicion = 0;
    
    const URL = "https://hotspotbackend-production.up.railway.app/users/email/"+email_usuario;

    const response = await fetch(URL
    ).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return "error"
    }).then(data => {

      if (data[0].favFests.length>0){
      for (let i = 0; i < data[0].favFests.length; i++) {
        const element = data[0].favFests[i];
        if(element == id_festival && estado){
          guardado = true;
          posicion = i;
        }
      }
    }

      if (!guardado && estado){
        estado.className = "bi bi-heart";
        estado.addEventListener("click",async function(evt){
          (evt.currentTarget as HTMLElement).className = "bi bi-heart-fill";
          // Aquí va el put o update pa actualizar el bicho
          let festis = data[0].favFests;
          festis.push(localStorage.getItem('IDFestival'));

          let URL = 'https://hotspotbackend-production.up.railway.app/users/' + data[0]._id;
          const response = await fetch(URL , {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ password: data[0].password,nombre: data[0].nombre, email: data[0].email, fechanacimiento: data[0].fechanacimiento, followed: data[0].followed, favArts: data[0].favArts, favFests: festis, foto: data[0].foto, tipo: data[0].tipo})
          }).then(response => {
            if (response.status === 200) {
              window.location.reload();
            } else {
              console.log('Error añadiendo el festival')
            }
          }).catch(error => {
            console.error("Error adding a fest:", error);
          });

        })
      } else if(guardado && estado){
        estado.className = "bi bi-heart-fill";
        estado.addEventListener("click",async function(evt){
          (evt.currentTarget as HTMLElement).className = "bi bi-heart";
          // Aquí va el put o update pa actualizar el bicho
          let festis = data[0].favFests;
          festis.splice(posicion,1);

          let URL = 'https://hotspotbackend-production.up.railway.app/users/' + data[0]._id;
          const response = await fetch(URL , {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ password: data[0].password,nombre: data[0].nombre, email: data[0].email, fechanacimiento: data[0].fechanacimiento, followed: data[0].followed, favArts: data[0].favArts, favFests: festis, foto: data[0].foto, tipo: data[0].tipo})
          }).then(response => {
            if (response.status === 200) {
              window.location.reload();
            } else {
              console.log('Error eliminando el festival')
            }
          }).catch(error => {
            console.error("Error deleting a fest:", error);
          });
        })
      }
     
    })
      .catch(error => {
        console.error("Error getting fest data:", error);
      });

}

}
