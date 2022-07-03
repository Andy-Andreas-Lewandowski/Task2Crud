import { Component, OnInit } from '@angular/core';
import { PersonData } from "../Entity/PersonData";
import { PersonService } from "../Service/PersonService";
import { ActivatedRoute } from '@angular/Router';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})

/**
 * Component that implements the detail view of a person as well as the delete and edit functionality.
 * It handles the interaction between user and the dedicated service to handle person data for these functions.
 */
export class PersonDetailComponent implements OnInit {
  person : PersonData = {id: -1,firstname:"undefined",lastname:"value wasn't found",eMail:"invalid"}
  keys : (keyof PersonData)[] = Object.keys(this.person) as (keyof PersonData)[]
  isUpdating : boolean = false

  constructor(private personService : PersonService,
              private routeService  : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getPerson()
  }

  /**
   * Requests the person with the in current route defined id and subscribes to it. Further it saves the keys of that
   * PersonData Object for the UI.
   */
  getPerson (): void{
    const id = Number(this.routeService.snapshot.paramMap.get('id'))
    this.personService.getPerson(id)
      .subscribe(person => this.person = person)
    this.keys = []
    this.keys = Object.keys(this.person) as (keyof PersonData)[]
  }

  /**
   * Takes a value and returns the corresponding html-input-type of it as a string
   *
   * @param value a value which's type should be translated into a html-input-type
   */
  getInputType(value : any){
    switch (typeof value) {
      case "string": return "text"
      case "number": return "number"
    }
    return "text"
  }

  /**
   * Sets this component into the state of a user editing it.
   */
  startUpdatingPerson(){
    this.isUpdating = true
  }

  /**
   * Sends an update request to the dedicated service and resets the state of this component to default.
   */
  confirmUpdateToPerson(){
    this.isUpdating = false
    this.personService.updatePerson(this.person).subscribe()
  }

  /**
   * Resets the state of this component to default and reloads the person displayed.
   */
  cancelUpdateToPerson(){
    this.getPerson()
    this.isUpdating = false
  }

  /**
   * Sends a person delete request to the dedicated service.
   */
  deletePerson(){
    this.personService.deletePerson(this.person.id).subscribe()

  }


}
