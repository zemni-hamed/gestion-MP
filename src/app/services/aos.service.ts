import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AosService {
  aoURL = "http://localhost:3000/aos"

  constructor(private httpClient: HttpClient) { }

  addAo(obj){
    return this.httpClient.post<{message : any, ao : any}>(this.aoURL,obj);
   }

   getAosBySaActu(client){
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    return this.httpClient.post<{message: any, listAos : any}>(`${this.aoURL}/actu`, client);
   }

   getAosBySaFav(client){
    console.log("ffffffffffffffffffffffffffffffffffffffffff");
    return this.httpClient.post<{message: any, listAosFav : any}>(`${this.aoURL}/fav`, client);
   }


   getAosByID(id){
    return this.httpClient.get<{message: any, listAos : any}>(`${this.aoURL}/mesAO/${id}`);
   }

   getAoByID(id){
    console.log("aloooooooooooooooooo", id)
    return this.httpClient.get<{message: any, ao : any}>(`${this.aoURL}/monAO/${id}`);
   }

   addRectif(rectif){
    return this.httpClient.put<{message: any}>(this.aoURL,rectif);
   }

   deleteAoByID(id){
    return this.httpClient.delete<{ message: any }>(`${this.aoURL}/${id}`);
   }
}
