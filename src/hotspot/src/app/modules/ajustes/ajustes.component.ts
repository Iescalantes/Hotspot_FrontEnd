import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss']
})
export class AjustesComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.chargeInfo();
  }


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
    }else{
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
  }
}
