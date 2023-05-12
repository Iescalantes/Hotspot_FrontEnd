import { Component } from '@angular/core';
import { Empresa } from '../empresa.model';

@Component({
  selector: 'app-registration2',
  templateUrl: './registration2.component.html',
  styleUrls: ['./registration2.component.scss']
})
export class Registration2Component {
  empresa: Empresa = this.newEmpresa();

  newEmpresa(){
    return new Empresa('','','','','','',0,'');
  }

  matchPasswords() {
    return this.empresa.password === this.empresa.confirmPassword;
}


async registerEmpresa() {
  if (this.matchPasswords()) {
    const URL = "http://localhost:5000/empresas";
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({foto: this.empresa.foto, password: this.empresa.password, nombre: this.empresa.nombre, email: this.empresa.email, telefono: this.empresa.tlf, verificacion: this.empresa.code, descripcion: this.empresa.desc, festivales: [] , megustas: 0, confirmado: false})
    }).then(response => {
      if (response.status === 200) {
        localStorage.setItem("loggedEmpresa", "y");
        response.json().then(empresa => console.log(empresa.nombre));
        localStorage.setItem("empresa", this.empresa.nombre);
        window.location.href = "";
      } else {
        location.reload();
      }
    }).catch(error => {
      console.error("Error creando la empresa:", error);
    });
  } else {
    window.location.href = "registration2";
  }
}
}