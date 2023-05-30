import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-gestion-artistas',
  templateUrl: './gestion-artistas.component.html',
  styleUrls: ['./gestion-artistas.component.scss']
})
export class GestionArtistasComponent implements AfterViewInit {

  ngAfterViewInit(){
    this.RolCheckAdmin();
    this.chargeArtistas();
    setTimeout(this.Guardian,100);
  }
  
  
  
  async chargeArtistas(){
  
    const URL = "https://hotspotbackend-production.up.railway.app/artistas";
    
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
  
  async RolCheckAdmin(){
    let rol = localStorage.getItem('tipo');
    let logged = localStorage.getItem('loggedUser');

    
    if (logged != 'y' || rol != 'admin' || rol == null){
      
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
      //Cambiar 'ruta' por la imagen de la guindilla sin color.
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