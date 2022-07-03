import {TestBed} from '@angular/core/testing';
import {PersonService} from "./PersonService";
import {HttpClient} from "@angular/common/http";
import {PersonData} from "../Entity/PersonData";
import {of} from "rxjs";
import SpyObj = jasmine.SpyObj;

describe('PersonService', () => {

  let mockPersonOne : PersonData = {id:0,firstname:"test",lastname:"person",eMail:"1"}
  let mockPersonTwo : PersonData = {id:1,firstname:"test",lastname:"person",eMail:"2"}
  let mockPersons   : PersonData[] = [mockPersonOne,mockPersonTwo]
  let mockHttpClient: SpyObj<HttpClient>
  let service: PersonService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonService ],
      providers: [ {provide: HttpClient,  useValue : mockHttpClient} ],
    })
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get','put','post','delete']);
    service = new PersonService(mockHttpClient)
  });

  it('should return all persons correctly (incl. calling only once)',(done: DoneFn)=>{
    mockHttpClient.get.and.returnValue(of(mockPersons));
    service.getPersons().subscribe(
      (persons : PersonData[]) => {
        mockPersons.forEach(
          (it) => { expect(persons.includes(it)).toBe(true)
          })
        done()
      })
    expect(mockHttpClient.get).toHaveBeenCalledOnceWith('api/persons')
    expect(mockHttpClient.get.calls.count()).toBe(1)
  });

  it('should return a person correctly (incl. calling only once)',()=>{
    let id = 0
    mockHttpClient.get.and.returnValue(of(mockPersonOne))
    service.getPerson(id).subscribe(
      (person : PersonData) => {
        expect(person).toBe(mockPersonOne)
      }
    )
    expect(mockHttpClient.get).toHaveBeenCalledOnceWith('api/persons/'+id)
    expect(mockHttpClient.get.calls.count()).toBe(1)
  });

  it('should update a person correctly (incl. calling only once)',()=>{
    mockHttpClient.put.and.returnValue(of(mockPersonOne))
    service.updatePerson(mockPersonOne).subscribe(
      (person : PersonData) => {
        expect(person).toBe(mockPersonOne)
      }
    )
    expect(mockHttpClient.put.calls.argsFor(0)["0"]).toBe('api/persons')
    expect(mockHttpClient.put.calls.argsFor(0)["1"]).toBe(mockPersonOne)
    expect(mockHttpClient.put.calls.count()).toBe(1)
  })

  it('should delete a person correctly  (incl. calling only once)',()=>{
    let id = 0
    mockHttpClient.delete.and.returnValue(of(mockPersonOne))
    service.deletePerson(id).subscribe((person : PersonData) => {
      expect(person).toBe(mockPersonOne)
    })
    expect(mockHttpClient.delete.calls.argsFor(0)["0"]).toBe('api/persons/'+id)
    expect(mockHttpClient.delete.calls.count()).toBe(1)
  })

  it('should add a person correctly (incl. calling only once)',()=>{
    mockHttpClient.post.and.returnValue(of(mockPersonOne))
    service.addPerson(mockPersonOne).subscribe((person : PersonData) => {
      expect(person).toBe(mockPersonOne)
    })
    expect(mockHttpClient.post.calls.argsFor(0)["0"]).toBe('api/persons')
    expect(mockHttpClient.post.calls.argsFor(0)["1"]).toBe(mockPersonOne)
    expect(mockHttpClient.post.calls.count()).toBe(1)
  })
});
