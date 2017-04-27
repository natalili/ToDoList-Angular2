import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { UsersComponent }  from './users.component';
import { CategorysComponent }  from './categorys.component';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, UsersComponent, CategorysComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
