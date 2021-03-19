import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Word} from "../model/word.model";

@Injectable({providedIn: "root"})
export class WordsService {
  constructor(private http: HttpClient) {}

  getWords(): Observable<Array<Word>> {
    return this.http.get<Word[]>('/assets/words/words.json');
  }
}
