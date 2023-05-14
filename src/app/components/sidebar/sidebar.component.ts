import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // logOrAct: boolean = true;
  userIsAuthenticated = "";
  private authListenerSubs: Subscription;
  private connectedClient: any;
  constructor(private clientService: ClientsService, private router: Router) { }

  ngOnInit() {
    this.connectedClient = JSON.parse(localStorage.getItem("connectedClient" || "{}"));
    // if (this.connectedClient) {
    //   this.clientIsAuthenticated = true;
    // }
    this.userIsAuthenticated = this.clientService.isUserAuth();

    this.authListenerSubs = this.clientService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  logout() {
    this.clientService.logout();

  }
}
