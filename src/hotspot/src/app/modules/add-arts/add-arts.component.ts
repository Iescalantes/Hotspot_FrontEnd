import { AfterViewInit, Component } from '@angular/core';
import { Artista } from '../artist.model ';

@Component({
  selector: 'app-add-arts',
  templateUrl: './add-arts.component.html',
  styleUrls: ['./add-arts.component.scss']
})
export class AddArtsComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    document.getElementById('finish')?.addEventListener('click', this.updateBusiness);
  }

  artista: Artista = this.newArtista();

  newArtista() {
    return new Artista('', '', '', [], '', [], []);
  }


  // AÑADIR festival a la empresa
  updateBusiness() {
    const URL = "http://localhost:5000/empresas/email/" + localStorage.getItem('email');
    const response = fetch(URL
    ).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return "error"
    }).then(data => {

      let array = data[0].festivales;
      array.push(localStorage.getItem('prev'));

      const URL2 = "http://localhost:5000/empresas/" + data[0]._id;
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

    const URL = "http://localhost:5000/artistas/nombre/" + nombre;

    const response = await fetch(URL
    ).then(response => {
      if (response.status === 200) {
        alert('Ese artista ya se encuentra en nuestra base de datos');
      } else {

        let generos = document.getElementById('gen')?.innerHTML.split(' ');
        let tags = document.getElementById('tags')?.innerHTML.split(' ');
        let array = [];
        array.push(localStorage.getItem('prev'))

        const URL = "http://localhost:5000/artistas";
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
    const URL = "http://localhost:5000/artistas";

    const response = fetch(URL
    ).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return "error"
    }).then(arts => {
      const URL2 = "http://localhost:5000/festivales/" + localStorage.getItem('prev');
      const response2 = fetch(URL2
      ).then(response => {
        if (response.status === 200) {
          return response.json();
        }
        return "error"
      }).then(data => {

        let array = data.artistas; // Esto tiene que contener los artistas del festival
        array.push(arts[arts.length - 1]._id); 

        const URL3 = "http://localhost:5000/festivales/" + localStorage.getItem('prev');
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


}
