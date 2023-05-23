import { AfterViewInit,Component } from '@angular/core';
import { Artista } from '../artist.model ';

@Component({
  selector: 'app-add-arts',
  templateUrl: './add-arts.component.html',
  styleUrls: ['./add-arts.component.scss']
})
export class AddArtsComponent implements AfterViewInit{
  
  ngAfterViewInit(): void {
  document.getElementById('finish')?.addEventListener('click',this.finish);
  }

  artista: Artista = this.newArtista();

  newArtista(){
    return new Artista ('','','',[],'',[],[]);
  }

  artistas_prov: Array<any> = [];

  async registerArtista() {

    let nombre = this.artista.apodo;

    const URL = "http://localhost:5000/artistas/name/" + nombre;
  
    const response = await fetch(URL
    ).then(response => {
      if (response.status === 200) {
        alert('Ese artista ya se encuentra en nuestra base de datos');
      }else{
        
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
              body: JSON.stringify({ foto: this.artista.foto, nombre: this.artista.nombre, apodo: this.artista.apodo, generos: generos, descripcion: this.artista.descripcion, tags: tags, festivales: array}) 
            }).then(response => {

              if (response.status === 200) {
                return response.json();
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

    guardarID() {
      const URL = "http://localhost:5000/artistas";
  
    const response = fetch(URL
    ).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return "error"
    }).then(data => {
      localStorage.setItem('prevArt',data[data.length-1]._id);
    })
    .catch(error => {
      console.error("Error getting fest data:", error);
    });
    };



    finish(){

      const URL = "http://localhost:5000/festivales/"+localStorage.getItem('prev');

      const response = fetch(URL
        ).then(response => {
          if (response.status === 200) {
            console.log('Tus muertos')
            return response.json();
          }
          return "error"
        }).then(data => { 
          console.log(data);
        })
        .catch(error => {
          console.error("Error getting business data:", error);
        });
    

      /*
      const URL = "http://localhost:5000/festivales/"+localStorage.getItem('prev');

      const response = fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Id_empresa: data[0].Id_empresa, nombre: this.festival.nombre, fecha: this.festival.fecha, localizacion: this.festival.localizacion, descripcion: this.festival.descripcion, mayoriaedad: this.festival.mayoriaedad, eshot: bonus1, esnovedad: bonus2, artistas: [], confirmado: false, megustas:0, foto: this.festival.foto })
      }).then(response => {
        window.location.href = 'festivales-publicados';
      }).catch(error => {
        console.error("Error updating the business:", error);
      });
*/
    
}
    

}
