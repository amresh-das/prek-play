export interface Person {
  name: string;
  fullName?: string;
  nicknames?: string[];
  relationship?: string;
  gender?: string;
  pics?: [];
  spouse?: string;
  kids?: Person[];
  isHead?: Boolean;
}

export interface Related {
  p1: string;
  relation: string;
  p2: string;
}

export enum Relation {
  CHILD ,
  SPOUSE
}

export interface Relatives {
  person: Person;
  relatives: Map<string, Relatives>
}
