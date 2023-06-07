import { Component } from '@angular/core';
import { User } from '../user.model';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent {
  user: User = this.newUser();

  newUser() {
    return new User("", "", "", "", new Date(), "", '');
  }

  matchPasswords() {
    return this.user.password === this.user.confirmPassword;
  }

  checkName() {
    return this.user.nombre.length > 2;
  }

  checkEmail() {
    return this.user.email.length > 2;
  }

  confirmData() {
    if (this.checkEmail() && this.checkName() && this.matchPasswords()) {
      return true;
    } else {
      return false;
    };
  };

  /**
   * Función para crear el objeto usuario al registrarse.
   */
  async registerUser() {
    if (this.confirmData()) {
      const URL = "https://hotspotbackend-production.up.railway.app/users";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password: this.user.password, nombre: this.user.nombre, email: this.user.email, fechanacimiento: this.user.fechanacimiento, followed: [], favArts: [], favFests: [], foto: this.user.foto, tipo: 'cliente' })
      }).then(response => {
        if (response.status === 200) {
          localStorage.setItem("loggedUser", "y");
          response.json().then(user => console.log(user.nombre));
          localStorage.setItem("username", this.user.nombre);
          window.location.href = "";
        } else {
          location.reload();
        }
      }).catch(error => {
        console.error("Error creando el usuario:", error);
      });
    } else {
      alert('Rellene todos los datos de forma correcta.');
    }
  }
}
