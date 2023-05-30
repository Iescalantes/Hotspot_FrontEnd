import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss']
})
export class AjustesComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.RolCheck();
    this.chargeInfo();
    this.deleter()
  }

  async deleter() {
    const URL = "http://localhost:5000/users/email/" + localStorage.getItem('email');

    const response = fetch(URL, {
      method: "DELETE"
    }).then(response => {
      localStorage.clear();
      localStorage.setItem("loggedUser", 'n');
      setTimeout(window.location.href = "",100);
    }).catch(error => {
      console.error("Error deleting the user:", error);
    });
  };


  async chargeInfo() {
    let email = localStorage.getItem('email');

    if (localStorage.getItem('soyempresa')) {
      const URL = "http://localhost:5000/empresas/email/" + email;

      const response = await fetch(URL
      ).then(response => {
        if (response.status === 200) {
          return response.json();
        }
        return "error"
      }).then(data => {

        let name = document.getElementById('Name');
        let email = document.getElementById('Email');
        let tlf = document.getElementById('Tlf');
        let desc = document.getElementById('Desc');

        if (name && email && tlf && desc) {
          name.innerHTML = data[0].nombre
          email.innerHTML = data[0].email
          tlf.innerHTML = data[0].telefono
          desc.innerHTML = data[0].descripcion
        };



      })
        .catch(error => {
          console.error("Error getting fest data:", error);
        });
    } else {
      const URL = "http://localhost:5000/users/email/" + email;

      const response = await fetch(URL
      ).then(response => {
        if (response.status === 200) {
          return response.json();
        }
        return "error"
      }).then(data => {

        let name = document.getElementById('Name');
        let email = document.getElementById('Email');

        if (name && email) {
          name.innerHTML = data[0].nombre
          console.log(name);
          email.innerHTML = data[0].email
        };



      })
        .catch(error => {
          console.error("Error getting fest data:", error);
        });
    }
  };

  async RolCheck(){
    let logged = localStorage.getItem('loggedUser');
    let rol = localStorage.getItem('tipo');

    
    if (logged != 'y' || logged == null || rol=='admin'){
      
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
      img.src= 'ruta';
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
