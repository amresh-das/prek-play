export interface Relative {
  person: string;
  relation: Relation;
  relative: string;
}

export enum Relation {
  SON,
  DAUGHTER,
}
