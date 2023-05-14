import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  // logOrAct : boolean = true;
  userIsAuthenticated = "";
  private authListenerSubs: Subscription;
  private connectedClient: any;
  constructor(private clientService: ClientsService) { }

  ngOnInit() {
    this.connectedClient = JSON.parse(localStorage.getItem("connectedClient" || "{}"));
    
    this.userIsAuthenticated = this.clientService.isUserAuth();
    console.log("xdxdxdx", this.userIsAuthenticated);
    

    this.authListenerSubs = this.clientService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.userIsAuthenticated = isAuthenticated;
      console.log("as observable on TS", this.userIsAuthenticated);
      
    });
  }

  // ngOnDestroy() {
  //   this.authListenerSubs.unsubscribe();
  // }
}


