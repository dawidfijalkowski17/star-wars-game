import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { PersonComponent } from './components/people/person.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonState } from './components/people/person.state';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    NgxsModule.forRoot([
      PersonState
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
