import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-gestion-artistas',
  templateUrl: './gestion-artistas.component.html',
  styleUrls: ['./gestion-artistas.component.scss']
})
export class GestionArtistasComponent implements AfterViewInit {

  ngAfterViewInit(){
    this.chargeArtistas();
    setTimeout(this.Guardian,100);
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
  
        let enlace = document.createElement('a');
        enlace.className = "enlaces";
        enlace.href = "vista-artista";
        enlace.style.display = 'flex';
        enlace.setAttribute('name',element._id);
  
        let imagen = document.createElement('img');
        imagen.src = 'assets/images/martin-garrix.jpg'
        imagen.style.borderRadius = "50%";
        imagen.style.width = "6rem";
        imagen.style.height = "6rem";
  
        let p = document.createElement('p');
        p.innerHTML = element.apodo;
        p.style.textAlign = "center";
        p.style.font = "large";
        p.style.marginTop = 'auto';
        p.style.marginBottom = 'auto';
        
        enlace.appendChild(imagen);
        enlace.appendChild(p);
        card.appendChild(enlace);
        listado?.appendChild(card);
        
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
  

}
