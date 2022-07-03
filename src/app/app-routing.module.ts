import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/Router';

import { PersonComponent } from "./person/person.component";
import { PersonDetailComponent} from "./person-detail/person-detail.component";
import {AddPersonComponent} from "./add-person/add-person.component";

const routes : Routes = [
  { path: "", redirectTo: "person/select", pathMatch: "full"},
  { path: "person/select",      component: PersonComponent },
  { path: "person/select/:id",  component: PersonDetailComponent },
  { path: "person/new",         component: AddPersonComponent}

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
