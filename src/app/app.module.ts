import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ActualitesComponent } from './components/actualites/actualites.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddClientComponent } from './components/add-client/add-client.component';
import { LancerAoComponent } from './components/lancer-ao/lancer-ao.component';

import { MesAOComponent } from './components/mes-ao/mes-ao.component';
import { PostulerComponent } from './components/postuler/postuler.component';
import { OffresComponent } from './components/offres/offres.component';
import { MesDevisComponent } from './components/mes-devis/mes-devis.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    ActualitesComponent,
    FooterComponent,
    LoginComponent,
    AddClientComponent,
    LancerAoComponent,
    
    MesAOComponent,
    PostulerComponent,
    OffresComponent,
    MesDevisComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
