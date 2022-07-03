import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDetailComponent } from './person-detail.component';
import {of} from "rxjs";
import {PersonService} from "../Service/PersonService";
import {PersonData} from "../Entity/PersonData";
import {ActivatedRoute} from "@angular/Router";

describe('PersonDetailComponent', () => {
  let mockPersonService;
  let mockPerson : PersonData;
  let mockActivatedRoute: { snapshot: any; };

  let component: PersonDetailComponent;
  let fixture: ComponentFixture<PersonDetailComponent>;
  beforeEach(async () => {
    // Mock Person
    mockPerson = {id: 0,firstname:"Detail Test",lastname:"Person", eMail:"asd@bb.de"}
    // MockPersonService
    mockPersonService = jasmine.createSpyObj(['getPerson'])
    mockPersonService.getPerson.and.returnValue(of(mockPerson))
    // Mock ActivatedRoute
    mockActivatedRoute = {
      snapshot : {paramMap : {get:(()=>{return 0})}}
    };

    await TestBed.configureTestingModule({
      declarations: [ PersonDetailComponent ],
      providers: [
        {provide: PersonService,  useValue : mockPersonService},
        //Mock ActivatedRoute
        {provide: ActivatedRoute, useValue : mockActivatedRoute}
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load person correctly',()=>{
    expect(component.person).toBe(mockPerson)
  });

  it('changes button visiblity',()=>{
    // Not updating tests
    // Visible when not updating
    expect(fixture.nativeElement.querySelector('[class="edit"]'  ).disabled).toBe(false)
    expect(fixture.nativeElement.querySelector('[class="delete"]').disabled).toBe(false)
    expect(fixture.nativeElement.querySelector('[class="return"]').disabled).toBe(false)
    // Visible when updating
    expect(fixture.nativeElement.querySelector('[class="update"]').disabled).toBe(true)
    expect(fixture.nativeElement.querySelector('[class="cancel"]').disabled).toBe(true)

    // Updating tests
    // Visible when not updating
    component.isUpdating = true
    fixture.detectChanges()
    expect(fixture.nativeElement.querySelector('[class="edit"]'  ).disabled).toBe(true)
    expect(fixture.nativeElement.querySelector('[class="delete"]').disabled).toBe(true)
    expect(fixture.nativeElement.querySelector('[class="return"]').disabled).toBe(true)
    // Visible when updating
    expect(fixture.nativeElement.querySelector('[class="update"]').disabled).toBe(false)
    expect(fixture.nativeElement.querySelector('[class="cancel"]').disabled).toBe(false)
  });

  it('input disabled when not updating',()=>{
    fixture.nativeElement.querySelectorAll('input').forEach(
      (input : HTMLInputElement) =>{expect(input.disabled).toBe(true)}
    )
  });

  it('input not disabled when updating',()=>{
    component.isUpdating = true
    fixture.detectChanges()
    fixture.nativeElement.querySelectorAll('input').forEach(
      (input : HTMLInputElement) =>{expect(input.disabled).toBe(false)}
    )
  })

});
