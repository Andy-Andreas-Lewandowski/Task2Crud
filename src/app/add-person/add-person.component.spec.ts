import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonComponent } from './add-person.component';
import {PersonService} from "../Service/PersonService";
import {of} from "rxjs";
import {PersonData} from "../Entity/PersonData";
import SpyObj = jasmine.SpyObj;

describe('AddPersonComponent', () => {
  let mockPersonService : SpyObj<PersonService>;
  let mockPersonOne : PersonData;
  let mockPersonTwo : PersonData;

  let component: AddPersonComponent;
  let fixture: ComponentFixture<AddPersonComponent>;

  beforeEach(async () => {
    // Mock Persons
    mockPersonOne = {id: 0,firstname:"Test Person 1",lastname:"34", eMail:"12"}
    mockPersonTwo = {id: 1,firstname:"Test Person 2",lastname:"78", eMail:"56"}
    // MockPersonService
    mockPersonService = jasmine.createSpyObj('PersonService',['getPersons','addPerson'])
    mockPersonService.getPersons.and.returnValue(of([mockPersonOne,mockPersonTwo]))

    await TestBed.configureTestingModule({
      declarations: [ AddPersonComponent ],
      providers: [{provide: PersonService, useValue: mockPersonService} ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data correctly',()=>{
    expect(component.persons.length).toBe(2)
    expect(component.person.id).toBe(2)
  });

  it('should have the right amount of labels',()=>{
    expect(fixture.nativeElement.querySelectorAll('label').length).toBe(4)
  })

  it('should have the right amount of inputs',()=>{
    expect(fixture.nativeElement.querySelectorAll('input').length).toBe(4)
  })


  it('should return to person selection on add and cancel', () =>{
    let addButton : HTMLButtonElement = fixture.nativeElement.querySelector('[class="add"]')
    let cancelButton : HTMLButtonElement = fixture.nativeElement.querySelector('[class="cancel"]')
    expect(addButton.getAttribute("routerLink")).toBe("../select")
    expect(cancelButton.getAttribute("routerLink")).toBe("../select")
  });

  it('should add the person correctly (and call PersonService only once)', () => {
    mockPersonService.addPerson.and.returnValue(of(mockPersonOne))
    component.person = mockPersonOne
    component.addPerson()
    expect(mockPersonService.addPerson).toHaveBeenCalledOnceWith(mockPersonOne)
  });
});
