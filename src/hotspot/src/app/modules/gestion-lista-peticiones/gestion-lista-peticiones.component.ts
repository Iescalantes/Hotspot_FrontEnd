import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-gestion-lista-peticiones',
  templateUrl: './gestion-lista-peticiones.component.html',
  styleUrls: ['./gestion-lista-peticiones.component.scss']
})
export class GestionListaPeticionesComponent implements AfterViewInit {


  ngAfterViewInit(): void {
    this.TodosLosFestis();
    setTimeout(this.Guardian,100);
  }



  async TodosLosFestis() {

        const URL = "http://localhost:5000/festivales";

        const response = fetch(URL
        ).then(response => {
          if (response.status === 200) {
            return response.json();
          }
          return "error"
        }).then(data => { 
          console.log(data)
          for (let i = 0; i < data.length; i++) {
          const element = data[i];

          if (element.confirmado == false) {
  
            let enlace = document.createElement('a');
            enlace.className = "enlaces";
            enlace.href = "gestion-peticiones"
            enlace.setAttribute('name',element._id);

            let card = document.createElement('div');
            card.className = 'card mb-3';
            card.style.maxWidth = '540px';
  
            let row = document.createElement('div');
            row.className="row g-0";
  
            let col = document.createElement('div');
            col.className="col-md-4";
  
            let img = document.createElement('img');
            img.className="img-fluid rounded-start"
            img.src = element.foto;
  
            let col2 = document.createElement('div');
            col2.className="col-md-8";
  
            let body = document.createElement('div');
            body.className="card-body";
  
            let h5 = document.createElement('h5');
            h5.className='card-title'
            h5.innerHTML=element.nombre;
  
            let p = document.createElement('p');
            p.className='card-text';
            p.innerHTML=element.descripcion;
  
            let p2 = document.createElement('p');
            p2.className='card-text';
  
            let small = document.createElement('small');
            small.className = "text-body-secondary";
            small.innerHTML = 'Pendiente';
            small.style.color='red';
  
  
            if (card && row && col && img && col2 && body && h5 && p && p2 && small){
              p2.appendChild(small);
              body.appendChild(h5);
              body.appendChild(p);
              body.appendChild(p2);
              col2.appendChild(body);
              col.appendChild(img);
              row.appendChild(col);
              row.appendChild(col2);
              card.appendChild(row);
              enlace.appendChild(card);
              document.getElementById('listado_festivales')?.appendChild(enlace);
            };
          }
  }
})
        .catch(error => {
          console.error("Error getting fest data:", error);
        });

        
      
  }


  async Guardian() {
    let enlaces = document.getElementsByClassName('enlaces');

      for (let i = 0; i < enlaces.length; i++) {
        let element = enlaces[i]

        element?.addEventListener('click', function(evt){
          let nombre = (evt.currentTarget as HTMLElement).getAttribute("name") || "No se ha podido cargar";
          localStorage.setItem('IDFestival', nombre);
        })
      }
  };

}
