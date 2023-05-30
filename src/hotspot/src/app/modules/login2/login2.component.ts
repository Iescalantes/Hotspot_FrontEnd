import { Component } from '@angular/core';
import { Empresa } from '../empresa.model';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss']
})
export class Login2Component {

  empresa: Empresa = this.newEmpresa();
  array: any = [];
  newEmpresa() {
    return new Empresa("", "", "", "", "", "", 0,this.array);
  }

  async comprobarEmpresa() {
    let emailAComprobar = this.empresa.email;

    if (emailAComprobar != "") {
      const URL = "http://localhost:5000/empresas/login";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({password: this.empresa.password,email: this.empresa.email})
      }).then(response => {
        if (response.status === 200) {
          localStorage.setItem("loggedUser", "y");
          response.json().then(user => {
          localStorage.setItem("email", this.empresa.email);
          localStorage.setItem('soyempresa','y');
          });
          window.location.href = "";
        } else {
          console.log("Error")
        }
      }).catch(error => {
        console.error("Error buscando el usuario:", error);
      });

    }

  }


}
