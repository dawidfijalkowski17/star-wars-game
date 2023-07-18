import { Component, Inject, OnInit } from '@angular/core';
import { randomIntFormInterval } from './utils';
import { Select, Store } from '@ngxs/store';
import { PersonState, PersonsGet } from './components/people/person.state';
import { Observable } from 'rxjs';
import { IPerson, IPersons } from './components/people/person.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Select(PersonState.persons) persons$!: Observable<IPersons[]>
  @Select(PersonState.returnWinner) winner$!: Observable<any>
  title = 'star-wars-game';
  winnerName!: string;

  firstSelected!: IPersons;
  secondSelected!: IPersons;

  constructor(@Inject(Store) private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new PersonsGet());
  }

  onSelectFirstPerson(event: MatSelectChange) {
    this.firstSelected = event.value;
  }

  onSelectSecondPerson(event: MatSelectChange) {
    this.secondSelected = event.value;
  }

  get label(): string {
    if (this.firstSelected && this.secondSelected) return 'Fight'
    if (this.firstSelected && !this.secondSelected) return 'Select second fighter'
    if (!this.firstSelected && this.secondSelected) return 'Select first fighter'
    return 'Select fighters'
  }
  get randomIdCardFirst() {
    return randomIntFormInterval(1, 82);
  }

  get randomIdCardSecond() {
    return randomIntFormInterval(1, 82);
  }

  fight() {
    this.winner$.subscribe((res: IPerson) => {
      this.winnerName = res.name;
    })
  }
}
