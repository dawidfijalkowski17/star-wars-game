import { Inject, Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { IPersons, IPerson } from "./person.model";
import { tap } from "rxjs";
import { API } from "src/app/shared/API.service";
import { PersonHelper } from "./person.helper";

export class PersonsGet {
  static readonly type = '[Person] PersonsGet'
}

export class PersonGet {
  static readonly type = '[Person] PersonGet'
  constructor(public uid: string, public isFirst: boolean) {}
}

export interface PersonStateModel {
  person: {
    person1: IPerson,
    person2: IPerson
  },
  persons: IPersons[]
}

@State<PersonStateModel>({
  name: 'People',
  defaults: {
    person: {} as any,
    persons: [] as IPersons[]
  }
})
@Injectable()
export class PersonState {

  constructor(@Inject(API) private API: API) {}

  @Selector()
  static returnWinner({ person }: PersonStateModel): any {
    return PersonHelper.comparePersonMass(person.person1, person.person2);
  }

  @Selector()
  static persons({ persons }: PersonStateModel): IPersons[] {
    return persons;
  }

  @Selector()
  static person({ person }: PersonStateModel): any{
    return person;
  }


  @Action(PersonGet)
  PersonGet(ctx: StateContext<PersonStateModel>, { uid, isFirst }: PersonGet) {
    const personOne = ctx.getState().person.person1;
    const personTwo = ctx.getState().person.person2;
    const people = ctx.getState().persons;
    return this.API.get(this.API.URL.PERSON + '/' + uid).pipe(
      tap((p: any) => {
        ctx.setState({ person: { person1: isFirst ? p.result.properties : personOne, person2: isFirst ? personTwo : p.result.properties }, persons: people });
      })
    );
  }

  @Action(PersonsGet)
  PersonsGet(ctx: StateContext<PersonStateModel>) {
    return this.API.get(this.API.URL.PERSON, { page: 1, limit: 82 }).pipe(
      tap((p: any) => {
        ctx.setState({ person: {} as any, persons: p.results });
      })
    );
  }
}
