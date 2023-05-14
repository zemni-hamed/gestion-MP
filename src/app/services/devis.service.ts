import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DevisService {
  devisURL = "http://localhost:3000/devis"
  constructor(private httpClient: HttpClient , private router:Router) { }


  addDevis(obj){
    return this.httpClient.post<{message : any, dev : any}>(this.devisURL,obj)
}

getDevisForThisAo(crit){

  
  return this.httpClient.post<{message : any, listdev : any}>(`${this.devisURL}/devao`, crit)
}

getAllMyDevis(id){

  return this.httpClient.get<{message : any, listdev : any}>(`${this.devisURL}/${id}`)
}

deleteDevisByID(id){

  return this.httpClient.delete<{ message: any }>(`${this.devisURL}/${id}`);
}

acceptDevis(id){
  console.log("iddddddddddddddddddddd", id);
  return this.httpClient.put<{ message: any }>(this.devisURL,id);
}

addMsg(newMsg){
console.log(newMsg);
return this.httpClient.put<{ message: any }>(`${this.devisURL}/msgDevis`, newMsg);

}

anulNotifCandidat(id){
  
  return this.httpClient.post<{ message: any }>(`${this.devisURL}/anc/${id}`,id);
  
  }

  addMsgC(newMsg){
    console.log(newMsg);
    return this.httpClient.put<{ message: any }>(`${this.devisURL}/msgDevisC`, newMsg);
    
    }

    anulNotifDO(id){
  
      return this.httpClient.post<{ message: any }>(`${this.devisURL}/ando/${id}`,id);
      
      }
}
