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
      const URL = "https://hotspotbackend-production.up.railway.app/users/login";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({password: this.user.password,email: this.user.email})
      }).then(response => {
        if (response.status === 200) {

          localStorage.setItem("loggedUser", "y");
          this.getTipo();
          localStorage.setItem("email", this.user.email);
          localStorage.setItem('loggedEmpresa','n');

        } else {
          console.log("Error")
        }
      }).catch(error => {
        console.error("Error buscando el usuario:", error);
      });

    }

  }


async getTipo(){
  
    const URL = "https://hotspotbackend-production.up.railway.app/users/email/" + this.user.email;
    const response = fetch(URL
    ).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return "error"
    }).then(data => {
      localStorage.setItem("tipo",data[0].tipo);
      window.location.href = "";
    })
    .catch(error => {
      console.error("Error getting user data:", error);
    });

  };

}
