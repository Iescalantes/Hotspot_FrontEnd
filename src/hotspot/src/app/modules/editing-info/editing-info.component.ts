import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-editing-info',
  templateUrl: './editing-info.component.html',
  styleUrls: ['./editing-info.component.scss']
})
export class EditingInfoComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.RolCheck();
    this.filtro();
    
  }

  
  async filtro() {
    let cancelar = document.getElementById('cancel');

    cancelar?.addEventListener('click', function () {
      window.location.href = 'ajustes';
    })
    if (localStorage.getItem('soyempresa') == 'y') {


      let tlf = document.getElementById('Tlf');
      let desc = document.getElementById('Desc');
      let boton = document.getElementById('confirm');
      let name = document.getElementById('Name');
      let email = document.getElementById('Email');

      if (tlf && desc && boton && name && email) {

        boton.addEventListener('click', function () {

          const URL = "http://localhost:5000/empresa/email/" + localStorage.getItem('email');
          const response = fetch(URL
          ).then(response => {
            if (response.status === 200) {
              return response.json();
            }
            return "error"
          }).then(data => {

            const URL = "http://localhost:5000/empresa/" + data[0]._id;

            let name = document.getElementById('Name');
            let email = document.getElementById('Email');
            let tlf = document.getElementById('Tlf');
            let desc = document.getElementById('Desc');



            if (!(name as HTMLInputElement).value || !(email as HTMLInputElement).value || !(tlf as HTMLInputElement).value || !(desc as HTMLInputElement).value) {
              alert('Debe rellenar todos los campos');
              (name as HTMLInputElement).value = data[0].nombre;
              (email as HTMLInputElement).value = data[0].email;
              (tlf as HTMLInputElement).value = data[0].telefono;
              (desc as HTMLInputElement).value = data[0].descripcion;
              
            } else {

              const response = fetch(URL, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ password: data[0].password, nombre: (name as HTMLInputElement).value, email: (email as HTMLInputElement).value, telefono: (tlf as HTMLInputElement).value, verificacion: data[0].verificacion, descripcion: (desc as HTMLInputElement).value, festivales: data[0].festivales })
              }).then(response => {
                window.location.href = 'ajustes';
              }).catch(error => {
                console.error("Error updating the business:", error);
              });
            }

          })
            .catch(error => {
              console.error("Error getting business data:", error);
            });

        });
      }




    } else {
      let form = document.getElementById('form');
      let tlf = document.getElementById('Tlf');
      let l1 = document.getElementById('label1');
      let desc = document.getElementById('Desc');
      let l2 = document.getElementById('label2');
      let boton = document.getElementById('confirm');

      if (form && tlf && desc && l1 && l2 && boton) {
        form.removeChild(tlf);
        form.removeChild(desc);
        form.removeChild(l1);
        form.removeChild(l2);

        boton.addEventListener('click', function () {

          let name = document.getElementById('Name');
          let email = document.getElementById('Email');

          const URL = "http://localhost:5000/users/email/" + localStorage.getItem('email');
          const response = fetch(URL
          ).then(response => {
            if (response.status === 200) {
              return response.json();
            }
            return "error"
          }).then(data => {

            const URL = "http://localhost:5000/users/" + data[0]._id;

            let name = document.getElementById('Name');
            let email = document.getElementById('Email');



            if (!(name as HTMLInputElement).value || !(email as HTMLInputElement).value) {
              alert('Debe rellenar todos los campos');
              (name as HTMLInputElement).value = data[0].nombre;
              (email as HTMLInputElement).value = data[0].email;
            } else {

              const response = fetch(URL, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ password: data[0].password, nombre: (name as HTMLInputElement).value, email: (email as HTMLInputElement).value, fechanacimiento: data[0].fechanacimiento, followed: data[0].followed, favArts: data[0].favArts, favFests: data[0].favFests, foto: data[0].foto, tipo: data[0].tipo })
              }).then(response => {
                window.location.href = 'ajustes';
              }).catch(error => {
                console.error("Error updating the user:", error);
              });
            }

          })
            .catch(error => {
              console.error("Error getting user data:", error);
            });

        });
      }

    }
  }


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
