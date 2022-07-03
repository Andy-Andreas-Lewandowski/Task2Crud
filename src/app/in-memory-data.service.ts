import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {PersonData} from "./Entity/PersonData";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const persons = [
      {id: 0, firstname: "Winnie",    lastname: "Pooh",             eMail: "honeypot@lazy-mail.com" },
      {id: 1, firstname: "Jane",      lastname: "Doe",              eMail: "unkown@mail.com" },
      {id: 2, firstname: "Count",     lastname: "Dunkular",         eMail: "honeypot@lazy-mail.com" },
      {id: 3, firstname: "Dorothy",   lastname: "Gale",             eMail: "count.dunk@webmail.com" },
      {id: 4, firstname: "JarJar",    lastname: "Abrams",           eMail: "this.aint@artmail.com" },
      {id: 5, firstname: "John",      lastname: "Doe",              eMail: "unkown22@mail.com" },
      {id: 6, firstname: "Kurt",      lastname: "Cobain",           eMail: "grunge@club27.com" },
      {id: 7, firstname: "Dirty",     lastname: "Harry",            eMail: "smith&wesson@sfpd.com" },
      {id: 8, firstname: "Isaac",     lastname: "Asimov",           eMail: "dreaming@electric-sheep.com" },
      {id: 9, firstname: "Arthur C.", lastname: "Clark",            eMail: "2001odysee@spacemail.com" },
      {id: 10,firstname: "John",      lastname: "von Neumann",      eMail: "mergesort@algomail.com" },
      {id: 11,firstname: "Emmy",      lastname: "Noether",          eMail: "rings@algebra.com" }
    ]
    return {persons}
  }

  genId(persons : PersonData[]) : number {
    let nxtId : number = 0

    while(true){
      let idAlreadyUsed : boolean = false
      for(let i = 0;i<persons.length;i++){
        if(persons[i].id === nxtId){
          idAlreadyUsed = true
          break;
        }
      }
      if(!idAlreadyUsed){
        break
      }else{
        nxtId++
      }
    }
    return nxtId
  }


}
