import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-miespacio',
  templateUrl: './miespacio.component.html',
  styleUrls: ['./miespacio.component.scss']
})
export class MiespacioComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.chargeInfoFestis();
    this.chargeInfoArtists();
  }



  async chargeInfoFestis() {
    let container = document.getElementById('festivales');

    const URL = "http://localhost:5000/festivales";


    const response = fetch(URL
    ).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return "error"
    }).then(data => {

      for (let i = 0; i < data.length; i++) {
        const element = data[i];

        let a = document.createElement('a');
        a.setAttribute('name',element._id);
        a.href = 'vista-festival';
        a.className = 'enlaces'
        a.style.marginLeft = '1%'
        a.style.marginRight = '1%'
        a.style.color = 'white'
        
        let card = document.createElement('div');
        card.className = 'card';
        card.style.width = '18rem'
        card.style.color = 'black';
        card.style.background = 'none';
        card.style.border = '1px solid white';

        let img = document.createElement('img');
        img.src = data[i].foto;

        let div = document.createElement('div');
        div.className = 'card-body'

        let p = document.createElement('p');
        p.className = 'card-text'
        p.innerHTML = data[i].nombre;
        p.style.color = 'white'

        div.appendChild(p);
        card.appendChild(img);
        card.appendChild(div);
        a.appendChild(card);
        container?.appendChild(a);

      }
      this.GuardianFestis();
    })
      .catch(error => {
        console.error("Error getting fest data:", error);
      });

  };

  async chargeInfoArtists() {
    let container = document.getElementById('artistas');

    const URL = "http://localhost:5000/artistas";


    const response = fetch(URL
    ).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return "error"
    }).then(data => {

      for (let i = 0; i < data.length; i++) {
        const element = data[i];

        let a = document.createElement('a');
        a.setAttribute('name',element._id);
        a.href = 'vista-artista';
        a.className = 'enlaces'
        a.style.marginLeft = '1%'
        a.style.marginRight = '1%'
        a.style.color = 'white'

        let card = document.createElement('div');
        card.className = 'card';
        card.style.width = '10rem'
        card.style.color = 'black';
        card.style.background = 'none';
        card.style.border = '1px solid white';

        let img = document.createElement('img');
        img.src = data[i].foto;

        let div = document.createElement('div');
        div.className = 'card-body'

        let p = document.createElement('p');
        p.className = 'card-text'
        p.innerHTML = data[i].nombre;
        p.style.color = 'white'


        div.appendChild(p);
        card.appendChild(img);
        card.appendChild(div);
        a.appendChild(card);
        container?.appendChild(a);

      }
      this.GuardianArtists();
    })
      .catch(error => {
        console.error("Error getting fest data:", error);
      });

  };


  async GuardianFestis() {
    let enlaces = document.getElementsByClassName('enlaces');

      for (let i = 0; i < enlaces.length; i++) {
        let element = enlaces[i]

        element?.addEventListener('click', function(evt){
          let nombre = (evt.currentTarget as HTMLElement).getAttribute("name") || "No se ha podido cargar";
          localStorage.setItem('IDFestival', nombre);
        })
      }
  };

  async GuardianArtists() {
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
