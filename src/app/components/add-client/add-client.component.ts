import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  addClientForm: FormGroup;
  client: any = {};

  constructor(private formBuilder: FormBuilder, private clientService : ClientsService, private router : Router) { }

  ngOnInit() {
    this.addClientForm = this.formBuilder.group({
      adresse: [''],
      cp: [''],
      email: [''],
      password: [''],
      region: [''],
      role: [''],
      rs: [''],
      sa: [''],
      tel: ['']
    })
  }

  addC(){
    console.log("here my Object", this.client);
    this.clientService.addClient(this.client).subscribe((response)=>{console.log("here reponse after adding", response.message);
    });
    this.router.navigate(['/']);
  }

}
