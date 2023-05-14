import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {NgForm} from '@angular/forms'
import { AosService } from 'src/app/services/aos.service';
import { DevisService } from 'src/app/services/devis.service';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {
  listeOffres: FormGroup;
  sendMsg: NgForm;
  message: any;
  critRech: any = {};
  mesAO: any;
  mesDevis: any = [];
  mesDevis1: any;
  nbrDev: any;
  nbrDev1: any;
 connectedClient: any;
 bestPrice: any;
 selectedRow: number =null;
 newMsg :any = {};
 
  constructor(private formBuilder: FormBuilder, private aosService: AosService, private devisService: DevisService, private cd: ChangeDetectorRef) { }

  ngOnInit() {

    this.connectedClient = JSON.parse(localStorage.getItem("connectedClient" || "{}"));
  
    this.getMesAO();
  }

   getMesAO(){
    this.aosService.getAosByID(this.connectedClient._id).subscribe((response)=>{
      this.mesAO = response.listAos;
      console.log(this.mesAO, response.message);
      });
  }

  listerDevis(){
    
 
 this.critRech.me = this.connectedClient._id
 console.log("fdfffffffff", this.critRech);
     this.devisService.getDevisForThisAo(this.critRech).subscribe((response)=>{
      if (response.message === "0") {
        this.nbrDev = 0;
        this.bestPrice = 0;
        this.mesDevis = null;
        this.cd.detectChanges();
        console.log("liste0",this.nbrDev, this.mesDevis);
        
      } else {
        this.mesDevis = response.listdev;
        this.bestPrice = this.mesDevis[0].prix
        console.log("aaaaaaaaaaaaaaa", this.mesDevis);
        
        // this.cd.detectChanges();
      console.log(this.mesDevis, response.message);
      this.nbrDev = parseInt(response.message);
      console.log("bbbbbbbbbbbb", this.nbrDev);
      
      this.cd.detectChanges();
      // console.log("liste1", "/",this.nbrDev, "/", this.mesDevis);
      }
      // this.cd.detectChanges();
      });
      
  }

  modifierVariable(){
    this.mesDevis = this.mesDevis;
    this.nbrDev = this.nbrDev1;
    this.cd.detectChanges();
  }

  accepter(id){
    console.log("iddddddddddddddddddddd", id);
    
    this.devisService.acceptDevis(id).subscribe((response)=>{
      console.log(response.message);
      
      
      });

  }
  toggleRow(index: number, id){

    if (this.selectedRow === index) {
      this.selectedRow = null;
      this.annulNotif(id)
    } else {
      this.selectedRow = index;
      this.annulNotif(id)
    }
  }
  sendMessage(iddevis){

    
    
    console.log(iddevis, this.message);

    this.newMsg.content = this.message;
    this.newMsg.id = iddevis;
    console.log(this.newMsg);
    this.devisService.addMsg(this.newMsg).subscribe((response)=>{
      console.log(response.message); 
      
      });

      

      this.listerDevis();
      this.sendMsg.reset();

      
  }

  annulNotif(id){
    this.devisService.anulNotifDO(id).subscribe((response)=>{
      console.log(response.message); 
      
      
      });
  }
}
