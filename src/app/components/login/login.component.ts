import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  client: any = {};
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router:Router, private clientService: ClientsService) {}

  ngOnInit() {
    let connectedClient = JSON.parse(localStorage.getItem("connectedClient" || "{}"));
    if (connectedClient) {
      this.router.navigate(['actualites']);
    } else{
      this.loginForm = this.formBuilder.group({
        email: [''],
        password: [''],
    })

  }

}

login(){
    
 console.log(this.client);
 
 this.clientService.loginClient(this.client)

 
}


}
