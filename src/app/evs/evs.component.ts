import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Item} from "./model/seasons";
import {SeasonsService} from "../services/seasons.service";
import {SelectContextItemsComponent} from "../shared/select-context-items/select-context-items.component";
import {Shuffler} from "../services/shuffle";
import {SettingsService} from "../services/settings.service";

@Component({
  selector: 'app-evs',
  templateUrl: './evs.component.html',
  styleUrls: ['./evs.component.scss']
})
export class EvsComponent implements OnInit {

  constructor(private dialog: MatDialog, private seasonsService: SeasonsService, private settingsService: SettingsService) { }

  ngOnInit(): void {
  }

  showSeason(name: string) {
    const allItems: Item[] = [];
    this.seasonsService.getItems().subscribe(items => items.forEach(i => allItems.push(i)));
    this.seasonsService.getSeason(name).subscribe(season => {
      const items : any = JSON.parse(JSON.stringify(season.items));
      const usedItems: any[] = [];
      for (let key in items) {
        // @ts-ignore
        items[key].forEach(i => usedItems.push(i));
      }
      items['unrelated'] = [];
      Shuffler.shuffle(allItems);
      allItems.filter(i => !usedItems.indexOf(i.name))
        .splice(0, this.settingsService.getConfigInt(SettingsService.SEASONS_EXTRA_ITEM_COUNT, 6))
        .forEach(i => {
          items['unrelated'].push(i);
      });
      this.dialog.open(SelectContextItemsComponent, {
        data: {
          context: name + ' Season',
          themePics: season.pics,
          items: items,
          itemPics: allItems
        },
        height: '100%',
        width: '100%',
        maxHeight: '100%',
        maxWidth: '100%',
      });
    });
  }
}
