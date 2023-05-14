import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AosService } from 'src/app/services/aos.service';
import { DevisService } from 'src/app/services/devis.service';

@Component({
  selector: 'app-postuler',
  templateUrl: './postuler.component.html',
  styleUrls: ['./postuler.component.css']
})
export class PostulerComponent implements OnInit {
  devisForm : FormGroup;
  aoInfo: {};
  id: any;
  myId: any;
  devi: any = {};

  constructor(private aosService : AosService, private activateRoute: ActivatedRoute, private router: Router, private devisService: DevisService) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id')
    this.getAoforDevis(this.id);
    this.myId = JSON.parse(localStorage.getItem("connectedClient"))._id

  }

  getAoforDevis(idAo){
    this.aosService.getAoByID(idAo).subscribe((response) => {
      this.aoInfo = response.ao;
      console.log(this.aoInfo, response.message);
    });
  }

  ajDevis(){

    console.log(this.devi);

    this.devi.idAo = this.id;
    this.devi.idCandidate = this.myId;
    this.devisService.addDevis(this.devi).subscribe((response)=>{console.log("here reponse after adding Devi", response.message, response.dev);
    this.router.navigate(['/']);
  })


    
  }



}
