import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person, Related} from "../evs/family-tree/person";

@Injectable({providedIn: "root"})
export class FamilyService {
  constructor(private http: HttpClient) {}

  getFamily(): Observable<Array<Related>> {
    return this.http.get<Related[]>('/assets/family/family.json');
  }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>('/assets/family/people.json');
  }

}
