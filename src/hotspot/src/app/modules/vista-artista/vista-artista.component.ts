import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-vista-artista',
  templateUrl: './vista-artista.component.html',
  styleUrls: ['./vista-artista.component.scss']
})
export class VistaArtistaComponent implements AfterViewInit{

  ngAfterViewInit() {
    this.chargeInfo();

  }

  async chargeInfo(){
    let id_artista = localStorage.getItem('IDArtista');
    
    
    const URL = "http://localhost:5000/artistas/"+id_artista;

    const response = await fetch(URL
    ).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return "error"
    }).then(data => {
      console.log(data);
      let artista = data;
      let nombre = document.getElementById('nombre');
      let alias = document.getElementById('alias');
      let desc = document.getElementById('desc');
      let generos = document.getElementById('generos');
      if (nombre && alias && desc && generos){
      nombre.innerHTML = artista.nombre;
      alias.innerHTML = artista.apodo;
      desc.innerHTML = artista.descripcion;
      generos.innerHTML = artista.generos;
      }
    })
      .catch(error => {
        console.error("Error getting fest data:", error);
      });



    };
    
  
}
