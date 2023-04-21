import { Component } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user: User = this.newUser();

  newUser() {
    return new User("", "", "", "", new Date(), "", "");
  }

  async comprobarUser() {
    let emailAComprobar = this.user.email;

    if (emailAComprobar != "") {
      const URL = "http://localhost:5000/users/login";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({password: this.user.password,email: this.user.email})
      }).then(response => {
        if (response.status === 200) {
          localStorage.setItem("loggedUser", "y");
          response.json().then(user => {
            localStorage.setItem("username", user.nombre);
          localStorage.setItem("tipo", user.tipo);
          localStorage.setItem("email", user.email);
          });
          window.location.href = "";
        } else {
          console.log("hola")
        }
      }).catch(error => {
        console.error("Error buscando el usuario:", error);
      });

    }

  }


}
