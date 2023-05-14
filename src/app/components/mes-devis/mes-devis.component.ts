import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DevisService } from 'src/app/services/devis.service';

@Component({
  selector: 'app-mes-devis',
  templateUrl: './mes-devis.component.html',
  styleUrls: ['./mes-devis.component.css']
})
export class MesDevisComponent implements OnInit {

  connectedClient: any;
  mesDevis: any;
  selectedRow: number =null;
 newMsg :any = {};
 sendMsg: FormGroup;
  message: any;

  constructor(private devisService: DevisService) { }

  ngOnInit() {
    this.connectedClient = JSON.parse(localStorage.getItem("connectedClient" || "{}"));
    this.getAllMyDevis();
  }


  getAllMyDevis(){
   this.devisService.getAllMyDevis(this.connectedClient._id).subscribe((response)=>{

    this.mesDevis = response.listdev;
console.log(this.mesDevis);

   });

  }

  deleteDevis(id){
    this.devisService.deleteDevisByID(id).subscribe((response)=>{
      let message = response.message;
      console.log(message);
      this.getAllMyDevis();
      });

  }

  toggleRow(index: number, id){
  

    if (this.selectedRow === index) {
      this.selectedRow = null;
      this.annulNotif(id);
    } else {
      this.selectedRow = index;
      this.annulNotif(id);
    }
   
  }

  sendMessage(iddevis){
    
    console.log(iddevis, this.message);

    this.newMsg.content = this.message;
    this.newMsg.id = iddevis;
    console.log(this.newMsg);
    this.devisService.addMsgC(this.newMsg).subscribe((response)=>{
      console.log(response.message); 
      
      
      });
  }

  annulNotif(id){
    this.devisService.anulNotifCandidat(id).subscribe((response)=>{
      console.log(response.message); 
      
      
      });
  }
}
