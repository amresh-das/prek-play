import {Component, OnInit} from '@angular/core';
import {FamilyService} from "../../services/family.service";
import {Person, Related} from "./person";
import {Randomizer} from "../../services/randomizer";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.scss']
})
export class FamilyTreeComponent implements OnInit {
  relations: Related[] = [];
  people: Map<string, Person> = new Map<string, Person>();
  picDisplayIndices: Map<string, number> = new Map<string, number>();
  show: string = "1";
  showSecond: Boolean = false;

  constructor(private familyService: FamilyService) {
    forkJoin([this.familyService.getFamily(), this.familyService.getPeople()]).subscribe(results => {
      results[0].forEach(relation => this.relations.push(relation));
      results[1].forEach(person => this.cachePerson(person));
    });
  }

  private cachePerson(person: Person) {
    if (!this.people.has(person.code)) {
      person.isHead = true;
      Randomizer.randomize(person.pics ? person.pics : []);
      this.people.set(person.code, person);
    }
  }

  ngOnInit(): void {
  }

  getFamilyData(): Person[] {
    this.relations.forEach(r => {
      const person = this.people.get(r.p1);
      const relative = this.people.get(r.p2);
      if (person && relative) {
        if (r.relation === 'SPOUSE') {
            person.spouse = relative.code;
            relative.spouse = person.code;
        } else if (r.relation === 'CHILD') {
          if (!relative.kids) {
            relative.kids = [];
          }
          person.isHead = false;
          if (relative.kids.filter(k => k.code === person.code).length == 0) {
            relative.kids.push(person);
          }
        }
        person.isRelated = true;
      }
    });
    const heads: Person[] = [];
    this.people.forEach(p => {
      if (p.spouse && !this.people.get(p.spouse)?.isHead) {
        p.isHead = false;
      }
      if (p.isRelated && p.isHead && !heads.find(h => h.spouse == p.code)) {
        heads.push(p);
      }
    });
    return heads;
  }

  getPicIndex(person: Person): number {
    const index = this.picDisplayIndices.get(person.code);
    return index ? index : 0;
  }
}
