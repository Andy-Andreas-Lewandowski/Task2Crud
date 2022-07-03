import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonComponent} from './person.component';
import {PersonService} from "../Service/PersonService";
import {of} from "rxjs";
import {PersonData} from "../Entity/PersonData";

describe('PersonComponent', () => {
  let mockPersonService;
  let persons : PersonData[];

  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    persons = []
    for(let i = 0; i <10;i++){
      persons.push({id:i,firstname: "the "+i+" th",lastname: "of " + i,eMail: i+"@mail.com"})
    }
    mockPersonService = jasmine.createSpyObj(['getPersons'])
    mockPersonService.getPersons.and.returnValue(of(persons))

    await TestBed.configureTestingModule({
      declarations: [ PersonComponent ],
      providers: [ {provide: PersonService,  useValue : mockPersonService} ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    component.ngOnInit()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should includes all persons and the add person button',()=>{
    expect(fixture.nativeElement.querySelectorAll('button').length).toBe(11)
  });

  it('should have all names and "+ New Person" displayed on the buttons',()=>{
    let buttons : HTMLElement[] = Array.from(fixture.nativeElement.querySelectorAll('button'))
    let names : string[] = ["+ New Person"]
    persons.forEach((it)=>{names.push(it.firstname +" "+it.lastname)})
    buttons.forEach((it)=>{
      expect(names.includes(it.textContent + "")).toBe(true)}
      )
  });

});
