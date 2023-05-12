import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-catalogoartistas',
  templateUrl: './catalogoartistas.component.html',
  styleUrls: ['./catalogoartistas.component.scss']
})
export class CatalogoartistasComponent implements AfterViewInit{

ngAfterViewInit(): void {
  this.chargeArtistas();
  this.chargeGeneros();
}

async chargeArtistas(){

  const URL = "http://localhost:5000/artistas";
  
  const response = await fetch(URL
  ).then(response => {
    if (response.status === 200) {
      return response.json();
    }
    return "error"
  }).then(data => {

    const listado = document.getElementById('listado');
    let contador = 1;
    for (let i = 0; i < data.length; i++) {
      const element = data[i];

      let card = document.createElement('card');
      card.id = contador.toString();
      card.className = "col-2 artistas"
      card.style.textAlign = "center"
      contador++;

      let imagen = document.createElement('img');
      imagen.src = 'assets/images/martin-garrix.jpg'
      imagen.style.borderRadius = "50%";
      imagen.style.width = "6rem";
      imagen.style.height = "6rem";

      let p = document.createElement('p');
      p.innerHTML = element.apodo;
      p.style.textAlign = "center";
      p.style.font = "large";
      
      card.appendChild(imagen);
      card.appendChild(p);
      listado?.appendChild(card);
      
    }

  })
  .catch(error => {
    console.error("Error getting fest data:", error);
  });


};

async chargeGeneros(){};


}


