import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AosService } from 'src/app/services/aos.service';

@Component({
  selector: 'app-lancer-ao',
  templateUrl: './lancer-ao.component.html',
  styleUrls: ['./lancer-ao.component.css']
})
export class LancerAoComponent implements OnInit {
  aloncerAOForm: FormGroup;
  ao: any = {};
  connectedClient: any = {};
  
  constructor(private aoService : AosService, private router : Router) { 


  }

  ngOnInit() {
    this.connectedClient = JSON.parse(localStorage.getItem("connectedClient"));
    console.log(this.connectedClient._id);

    
    
  }

  addAo(){
    this.ao.idLauncher = this.connectedClient._id
    this.ao.rectifs="";
    console.log("here my Object", this.ao);
    this.aoService.addAo(this.ao).subscribe((response)=>{console.log("here reponse after adding AO", response.message, response.ao);
    this.router.navigate(['actualites']);
  });
  }
  
}
