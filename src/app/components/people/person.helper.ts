import { IPerson } from "./person.model";

export class PersonHelper {
    static comparePersonMass(person1: IPerson, person2: IPerson) {
        return person1.mass > person2.mass ? person1 : person2;
    }
}