import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActualitesComponent } from './components/actualites/actualites.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { LancerAoComponent } from './components/lancer-ao/lancer-ao.component';
import { LoginComponent } from './components/login/login.component';
import { MesAOComponent } from './components/mes-ao/mes-ao.component';
import { MesDevisComponent } from './components/mes-devis/mes-devis.component';
import { OffresComponent } from './components/offres/offres.component';
import { PostulerComponent } from './components/postuler/postuler.component';


const routes: Routes = [
  {path:'actualites', component: ActualitesComponent},
  {path:'', component: LoginComponent},
  {path:'addClient', component: AddClientComponent},
  {path:'lancerAO', component: LancerAoComponent},
  {path:'mesAOS', component: MesAOComponent},
  {path:'lesOffres', component: OffresComponent},
  {path:'mesDevis', component: MesDevisComponent},
  {path:'postuler/:id', component: PostulerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
