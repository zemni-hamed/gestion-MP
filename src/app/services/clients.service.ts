import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  clientURL = "http://localhost:3000/clients"
  private authStatusListener = new Subject<string>();
  private isUserAuthenticated = "";
  
  constructor(private httpClient: HttpClient , private router:Router) { }

 addClient(obj){
  return this.httpClient.post<{message : any}>(this.clientURL,obj);
 }

 loginClient(client:any){
  console.log("login service",client);
  return this.httpClient.post<{message:any,user:any}>(`${this.clientURL}/login`, client).subscribe((data)=>{
    if (data.user) {
     localStorage.setItem("connectedClient",JSON.stringify(data.user))
     
      this.router.navigate(["/actualites"])
      this.isUserAuthenticated = "a";
        this.authStatusListener.next('a');
      
        console.log(this.isUserAuthenticated, this.authStatusListener);
        
    }
  })

}

getAuthStatusListener() {
  console.log("here into service asObservable");
  
  return this.authStatusListener.asObservable();

}

isUserAuth() {
  return this.isUserAuthenticated;
}



logout(){
    localStorage.removeItem('connectedClient');
    this.isUserAuthenticated = "";
    this.authStatusListener.next("");
    
    this.router.navigate(['/']);
    
  }

  addFav(idAo, client){
    client.listefav.push(idAo)
    localStorage.setItem("connectedClient",JSON.stringify(client) )
    return this.httpClient.post<{message:any,user:any}>(`${this.clientURL}/addFav`, client)
  }

  notFav(idAo, client){
    let pos: any;
    for (let i = 0; i < client.listefav.length; i++) {
      if (idAo == client.listefav[i]) {
        pos = i;
        break;
      }
      
    }

    client.listefav.splice(pos,1)
    localStorage.setItem("connectedClient",JSON.stringify(client) )
    return this.httpClient.post<{message:any,user:any}>(`${this.clientURL}/notFav`, client)
  }
}
