import { AfterViewInit, Component } from '@angular/core';
import { Artista } from '../artist.model ';

@Component({
  selector: 'app-add-arts',
  templateUrl: './add-arts.component.html',
  styleUrls: ['./add-arts.component.scss']
})
export class AddArtsComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.RolCheckBusiness();
    document.getElementById('finish')?.addEventListener('click', this.updateBusiness);
  }

  artista: Artista = this.newArtista();

  newArtista() {
    return new Artista('', '', '', [], '', [], []);
  }


  // AÑADIR festival a la empresa
  updateBusiness() {
    const URL = "https://hotspotbackend-production.up.railway.app/empresas/email/" + localStorage.getItem('email');
    const response = fetch(URL
    ).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return "error"
    }).then(data => {

      let array = data[0].festivales;
      array.push(localStorage.getItem('prev'));

      const URL2 = "https://hotspotbackend-production.up.railway.app/empresas/" + data[0]._id;
      const response2 = fetch(URL2, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ festivales: array })
      }).then(response => {
        window.location.href = 'festivales-publicados';
      }).catch(error => {
        console.error("Error updating the business:", error);
      });

    })
      .catch(error => {
        console.error("Error getting business data:", error);
      });
  };

  // REGISTRA ARTISTA Y LE DEFINE TAMBIEN EL FESTIVAL

  async registerArtista() {

    let nombre = this.artista.apodo;

    const URL = "https://hotspotbackend-production.up.railway.app/artistas/nombre/" + nombre;

    const response = await fetch(URL
    ).then(response => {
      if (response.status === 200) {
        alert('Ese artista ya se encuentra en nuestra base de datos');
      } else {

        let generos = document.getElementById('gen')?.innerHTML.split(' ');
        let tags = document.getElementById('tags')?.innerHTML.split(' ');
        let array = [];
        array.push(localStorage.getItem('prev'))

        const URL = "https://hotspotbackend-production.up.railway.app/artistas";
        const response = fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ foto: this.artista.foto, nombre: this.artista.nombre, apodo: this.artista.apodo, generos: generos, descripcion: this.artista.descripcion, tags: tags, festivales: array })
        }).then(response => {

          if (response.status === 200) {
            this.guardarID();
          }
          return "error"

        })
          .catch(error => {
            console.error("Error creando el artista:", error);
          });


      }
      return "error"
    }).catch(error => {
      console.error("Error getting artist data:", error);
    });

  }

// GUARDA IDs de ARTISTAS en el FESTIVAL

  guardarID() {
    const URL = "https://hotspotbackend-production.up.railway.app/artistas";

    const response = fetch(URL
    ).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return "error"
    }).then(arts => {
      const URL2 = "https://hotspotbackend-production.up.railway.app/festivales/" + localStorage.getItem('prev');
      const response2 = fetch(URL2
      ).then(response => {
        if (response.status === 200) {
          return response.json();
        }
        return "error"
      }).then(data => {

        let array = data.artistas;
        array.push(arts[arts.length - 1]._id); 

        const URL3 = "https://hotspotbackend-production.up.railway.app/festivales/" + localStorage.getItem('prev');
        const response3 = fetch(URL3, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ artistas: array })
        }).then(response => {

        }).catch(error => {
          console.error("Error updating the business:", error);
        });


      })
        .catch(error => {
          console.error("Error getting fest data:", error);
        });

    })
      .catch(error => {
        console.error("Error getting fest data:", error);
      });
  };

  async RolCheckBusiness(){
    let rol = localStorage.getItem('soyempresa');
    let logged = localStorage.getItem('loggedUser');

    
    if (logged != 'y' || rol != 'y' || rol == null){
      
      let body = document.getElementsByTagName('body');
      if (body){
      body[0].innerHTML = '';
      body[0].style.width='80%'; 
      body[0].style.height='80%'; 
      body[0].style.margin = 'auto';
      body[0].style.marginTop = '5%';

      
      
      let div = document.createElement('div');
      div.style.display = 'flex';
      div.id = 'container';

      let img = document.createElement('img');
      img.src= 'assets/images/GuindillaError.png';
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


      setTimeout(function temporizador(){window.location.href = ''},3000);
    }

    };
  };


}
