import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-vista-festival',
  templateUrl: './vista-festival.component.html',
  styleUrls: ['./vista-festival.component.scss']
})
export class VistaFestivalComponent implements AfterViewInit{

  ngAfterViewInit() {
    this.chargeInfo();

  }

  async chargeInfo(){
    let id_festival = localStorage.getItem('IDFestival');
    
    console.log(id_festival);
    };
    
  
}
