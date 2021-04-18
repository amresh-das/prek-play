import {Component, OnInit} from '@angular/core';
import {FamilyService} from "../../services/family.service";
import {Person, Related} from "./person";
import {Observable} from "rxjs";
import {Randomizer} from "../../services/randomizer";

@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.scss']
})
export class FamilyTreeComponent implements OnInit {
  relations: Related[] = [];
  people: Map<string, Person> = new Map<string, Person>();
  picDisplayIndices: Map<string, number> = new Map<string, number>();

  constructor(private familyService: FamilyService) {
    this.familyService.getFamily().subscribe(r => {
      r.forEach(rel => this.relations.push(rel));
      this.relations.forEach(r => {
        this.cachePerson(r.p1);
        this.cachePerson(r.p2);
      });
    });
  }

  private cachePerson(person: string) {
    if (!this.people.has(person)) {
      let personObj: Person = {name: person, isHead: true};
      this.people.set(person, personObj);
      this.familyService.getPerson(person).subscribe((p) => {
        personObj.pics = p.pics;
        Randomizer.randomize(personObj.pics ? personObj.pics : []);
        personObj.gender = p.gender;
        personObj.nicknames = p.nicknames;
        personObj.fullName = p.name;
      });
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
            person.spouse = relative.name;
            relative.spouse = person.name;
        } else if (r.relation === 'CHILD') {
          if (!relative.kids) {
            relative.kids = [];
          }
          person.isHead = false;
          if (relative.kids.filter(k => k.name === person.name).length == 0) {
            relative.kids.push(person);
          }
        }
      }
    });
    const heads: Person[] = [];
    this.people.forEach(p => {
      if (p.spouse && !this.people.get(p.spouse)?.isHead) {
        p.isHead = false;
      }
      if (p.isHead && !heads.find(h => h.spouse == p.name)) {
        heads.push(p);
      }
    });
    return heads;
  }

  getPicIndex(person: Person): number {
    const index = this.picDisplayIndices.get(person.name);
    return index ? index : 0;
  }

  nextPicIndex(person: Person) {
    const len = person.pics ? person.pics.length : 0;
    const index = this.picDisplayIndices.get(person.name);
    this.picDisplayIndices.set(person.name, (index && (index < len - 1) ? index + 1 : 1));
  }

  prevPicIndex(person: Person) {
    const index = this.picDisplayIndices.get(person.name);
    this.picDisplayIndices.set(person.name, (index && (index > 0) ? index - 1 : 0));
  }

}
