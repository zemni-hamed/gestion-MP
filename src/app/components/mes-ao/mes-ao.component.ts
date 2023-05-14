import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AosService } from 'src/app/services/aos.service';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-mes-ao',
  templateUrl: './mes-ao.component.html',
  styleUrls: ['./mes-ao.component.css']
})
export class MesAOComponent implements OnInit {

  rectifAOForm : FormGroup;
  mesAO: any;
  aoToModify: any;
  rectif: any = {};
  private connectedClient: any;
  constructor(private clientService: ClientsService, private aosService: AosService) {}

  ngOnInit() {
    this.connectedClient = JSON.parse(localStorage.getItem("connectedClient" || "{}"));
    console.log("/-/-/-",this.connectedClient._id);
    this.getMesAO();
    

  }

  getMesAO(){
    this.aosService.getAosByID(this.connectedClient._id).subscribe((response)=>{
      this.mesAO = response.listAos;
      console.log(this.mesAO, response.message);
      });
  }

  afficheAO(id){
    this.aosService.getAoByID(id).subscribe((response)=>{
      this.aoToModify = response.ao;
      console.log(this.aoToModify, response.message);
      });
  }

  modifAO(id){

    this.rectif.id = id;
    console.log(this.rectif);
    this.aosService.addRectif(this.rectif).subscribe((response)=>{
      let message = response.message;
      console.log(message);
      this.afficheAO(id);
      this.getMesAO();
      this.rectifAOForm.reset();
      alert(message);
      });
      
    
  }

  deleteAO(id){
    this.aosService.deleteAoByID(id).subscribe((response)=>{
      let message = response.message;
      console.log(message);
      this.afficheAO(id);
      this.getMesAO();
      });
  }


}
