import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AosService } from 'src/app/services/aos.service';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.css']
})
export class ActualitesComponent implements OnInit {
  tabActu: any = [];
  tabActuFav: any = [];
  aoInfo: {};
  connectedClient: any = {};
  logOrAct: boolean = true;
  

  constructor(private router: Router, private aoService: AosService, private clientService: ClientsService) { }

   async ngOnInit() {

    this.connectedClient = JSON.parse(localStorage.getItem("connectedClient"));
    console.log("here SA to the connected Client ", this.connectedClient.sa);

     await this.getActuAO();
      await this.getAosBySaActuFav();
     
  }

  getAO(id) {
    console.log("aloooooooooooooooooo", id);
    
    this.aoService.getAoByID(id).subscribe((response) => {
      this.aoInfo = response.ao;
      console.log(this.aoInfo, response.message);
    });
  }

   getActuAO(){
    
     this.aoService.getAosBySaActu(this.connectedClient).subscribe((response) => {
      this.tabActu = response.listAos;
      console.log(this.tabActu, response.message);

    });
  }

  getAosBySaActuFav(){
    
    
    this.aoService.getAosBySaFav(this.connectedClient).subscribe((response) => {
      this.tabActuFav = response.listAosFav;
      console.log(this.tabActuFav, response.message);

    });

  }

async addFav(idAo){
  
  this.clientService.addFav(idAo, this.connectedClient).subscribe((data)=>{
     console.log(data.message);
     console.log(data.user);
     ;

  })

      await this.getActuAO();
      await this.getAosBySaActuFav();

}

async notFav(idAo){
  
  this.clientService.notFav(idAo, this.connectedClient).subscribe((data)=>{
     console.log(data.message);
     console.log(data.user);
     ;

  })

      await this.getActuAO();
      await this.getAosBySaActuFav();

}
postuler(id){
  this.router.navigate([`postuler/${id}`])
}

compareDate(launchDate) {
     
  let ndate1 = new Date(this.connectedClient.lastcnx);
  let ndate2 = new Date(launchDate);
  
  let d1 = ndate1.getTime();
  let d2 = ndate2.getTime();
  let comp = 0;
  if (d1<d2) {
      comp = 1;
  } else {
      comp = 2;
  }

 console.log(ndate1, ndate2, d1, d2, comp);
 
return(comp)
  
}

}
