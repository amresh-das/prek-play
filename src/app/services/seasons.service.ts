import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Season} from "../evs/seasons/seasons";
import {Item} from "../shared/model/item";

@Injectable({providedIn: "root"})
export class SeasonsService {
  constructor(private http: HttpClient) {}

  getItems(): Observable<Array<Item>> {
    return this.http.get<Item[]>('/assets/seasons/items.json');
  }

  getSeason(name: string): Observable<Season> {
    return this.http.get<Season>('/assets/seasons/' + name + '.json');
  }
}
