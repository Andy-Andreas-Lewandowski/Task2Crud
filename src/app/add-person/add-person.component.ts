import { Component, OnInit } from '@angular/core';
import {PersonData} from "../Entity/PersonData";
import {PersonService} from "../Service/PersonService";

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})

/**
 * Component of the 'add a person to the database' functionality. It handles the user input and sends the
 * user request of adding a new person to the dedicated service.
 */
export class AddPersonComponent implements OnInit {
  persons : PersonData[] = []
  person  : PersonData = {id: -2,firstname:"",lastname:"",eMail:""}
  keys : (keyof PersonData)[] = Object.keys(this.person) as (keyof PersonData)[]

  constructor(private personService : PersonService){}

  ngOnInit(): void {
    this.getPersons()
  }

  /**
   * Requests all available person data from the dedicated service
   * and assigns to the person to be added the next available id
   * via a call of getNextId().
   */
  getPersons() : void {
    this.personService.getPersons()
      .subscribe(persons => {
        this.persons = persons
        this.person.id = this.getNextId()
      })
  }

  /**
   * Takes a value and returns the corresponding html-input-type of it as a string
   *
   * @param value a value which's type should be translated into a html-input-type
   *
   * @return html-input-type for the type of the param value
   */
  getInputType(value : any) : string{
    switch (typeof value) {
      case "string": return "text"
      case "number": return "number"
    }
    return "text"
  }

  /**
   * Sends a request to add a person to the dedicated service.
   */
  addPerson() : void{
    this.personService.addPerson(this.person).subscribe()
  }

  /**
   * Iterates over the list of all known persons to find the next availale id.
   *
   * @return the next available id
   */
  getNextId() : number {
    let nxtId : number = 0
    while(true){
      let idAlreadyUsed : boolean = false
      for(let i = 0;i<this.persons.length;i++){
        if(this.persons[i].id === nxtId){
          idAlreadyUsed = true
          break;
        }
      }
      if(!idAlreadyUsed) break
      else               nxtId++
    }
    return nxtId
  }
}
