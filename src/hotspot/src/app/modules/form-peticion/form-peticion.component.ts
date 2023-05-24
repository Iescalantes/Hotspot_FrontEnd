import { Component } from '@angular/core';
import { Festival } from '../festival.model';

@Component({
  selector: 'app-form-peticion',
  templateUrl: './form-peticion.component.html',
  styleUrls: ['./form-peticion.component.scss']
})
export class FormPeticionComponent {

  festival: Festival = this.newFestival();

  newFestival() {
    return new Festival('', '', new Date(), '', '', false, false, false, [], false, 0, '');
  }


  async registerFestival() {

    let idempresa = localStorage.getItem('email')
    const URL = "http://localhost:5000/empresas/email/" + idempresa;
    const response = await fetch(URL
    ).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return "error"
    }).then(data => {
      let id_empresa = data[0]._id;
      let tipo_peticion = localStorage.getItem('clase');
      let bonus1 = false;
      let bonus2 = false;
      if (tipo_peticion == 'Pro') { bonus1 = true }
      else if (tipo_peticion == 'Business') { bonus2 = true };


      const URL = "http://localhost:5000/festivales";
      const response = fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Id_empresa: id_empresa, nombre: this.festival.nombre, fecha: this.festival.fecha, localizacion: this.festival.localizacion, descripcion: this.festival.descripcion, mayoriaedad: this.festival.mayoriaedad, eshot: bonus1, esnovedad: bonus2, artistas: [], confirmado: false, megustas: 0, foto: this.festival.foto })
      }).then(async response => {
        if (response.status === 200) {
          this.guardarID();
        } else {
          alert('Algo ha salido mal')
          console.log('error')
        }

      }).catch(error => {
        console.error("Error creando el festival:", error);
      });

    })
      .catch(error => {
        console.error("Error getting fest data:", error);
      });

  }

  async guardarID() {
    const URL = "http://localhost:5000/festivales";

  const response = fetch(URL
  ).then(response => {
    if (response.status === 200) {
      return response.json();
    }
    return "error"
  }).then(data => {
    localStorage.setItem('prev',data[data.length-1]._id);
    localStorage.setItem('clase', '');
    window.location.href = 'addArts'
  })
  .catch(error => {
    console.error("Error getting fest data:", error);
  });
  };


}
