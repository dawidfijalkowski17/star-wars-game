import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PersonGet, PersonState } from './person.state';
import { IPerson, IPersons } from './person.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnChanges {
  @Select(PersonState.person) person$!: Observable<any>
  
  @Input() isFirst: boolean = false;
  @Input() personSelected!: IPersons;
  person!: IPerson;

  constructor(@Inject(Store) private store: Store) {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes['personSelected']) {
      if (this.personSelected) {
        this.store.dispatch(new PersonGet(this.personSelected.uid, this.isFirst));
        this.person$.subscribe((res) => {
          this.person = this.isFirst ? res.person1 : res.person2;
        })
      }
    }
  }
}
