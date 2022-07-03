import {catchError, Observable, of} from "rxjs";
import {PersonData} from "../Entity/PersonData";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";

/**
 * Service dedicated to handle the person related requests to the HttpClient.
 */
@Injectable({providedIn: 'root'})
export class PersonService {
  private personsUrl = 'api/persons'

  httpOptions = {
    headers : new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(
    private httpClient : HttpClient
  ) {}

  /**
   * Requests person data via http request from the application api and returns it as an observable.
   *
   * @return Observable<PersonData[]> with persons from HTTP-Request
   */
  getPersons(): Observable<PersonData[]> {
    return this.httpClient.get<PersonData[]>(this.personsUrl).pipe(
      catchError(this.handleError<PersonData[]>(`Couldn\'t load data!`))
    )
  }

  /**
   * Requests data of the person with the specified id via http request
   * from the application api and returns it as an observable.
   *
   * @return Observable<PersonData> with specified id from HTTP-Request
   */
  getPerson(id : number): Observable<PersonData>{
    const url = `${this.personsUrl}/${id}`
    return this.httpClient.get<PersonData>(url).pipe(
      catchError(this.handleError<PersonData>(`Couldn\'t load person with id ${id}!`))
    )
  }

  /**
   * Sends a PUT message via HTTP-Client to the api to update a person.
   *
   * @param person Person to be updated.
   */
  updatePerson(person : PersonData) : Observable<any>{
    return this.httpClient.put(this.personsUrl,person,this.httpOptions).pipe(
      catchError(this.handleError<PersonData>(`Couldn\'t push update to database!`))
    )
  }

  /**
   * Sends a POST message via HTTP-Client to the api to add a new entry for person.
   *
   * @param person Person to be added to the data set.
   */
  addPerson(person : PersonData) : Observable<PersonData>{
    return this.httpClient.post<PersonData>(this.personsUrl,person,this.httpOptions).pipe(
      catchError(this.handleError<PersonData>(`Couldn\'t add person to database!`))
    )
  }

  /**
   * Takes an Id and sends a DELETE message via HTTP-Client to the api to delete the person witht he given id.
   *
   * @param id Id of person to be deleted.
   */
  deletePerson(id : number) : Observable<any>{
    const url = `${this.personsUrl}/${id}`
    return this.httpClient.delete<PersonData>(url,this.httpOptions).pipe(
      catchError(this.handleError<PersonData>(`Couldn\'t delete person from database!`))
    )
  }

  /**
   * Handels errros and sends a Alert to the user.
   *
   * @param message
   * @param result
   * @private
   */
  private handleError<T>(message : String, result? : T) {
    return (error : any) : Observable<T> =>{
      console.error(error)
      alert(message)

    return of(result as T);
    }
  }
}
