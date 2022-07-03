import { Component, OnInit } from '@angular/core';
import {PersonData} from "../Entity/PersonData";
import {PersonService} from "../Service/PersonService";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

/**
 * A page on which all persons are listed and can be accessed as well as new persons added.
 */
export class PersonComponent implements OnInit {
  persons : PersonData[] = []

  constructor(private personService : PersonService){}


  ngOnInit(): void {
    this.getPersons()
  }

  /**
   * Requests all persons data from the dedicated service and subscribes to them.
   */
  getPersons() : void {
    this.personService.getPersons()
      .subscribe(persons => this.persons = persons)
  }
}
