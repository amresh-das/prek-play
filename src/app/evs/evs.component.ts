import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Item} from "./model/seasons";
import {SeasonsService} from "../services/seasons.service";
import {SelectContextItemsComponent} from "../shared/select-context-items/select-context-items.component";
import {Randomizer} from "../services/shuffle";
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
    this.seasonsService.getItems().subscribe(allItems => {
      this.seasonsService.getSeason(name).subscribe(season => {
        const itemObj : object = JSON.parse(JSON.stringify(season.items));
        const items: Map<string, Item[]> = new Map<string, Item[]>();
        for (const key in itemObj) {
          if (itemObj.hasOwnProperty(key)) {
            // @ts-ignore
            const keyItems: string[] = itemObj[key];
            // @ts-ignore
            const itemList: Item[] = keyItems.map(name => allItems.find(i => i.name === name)).filter(Boolean);
            items.set(key, itemList);
          }
        }
        const usedItems: string[] = [];
        items.forEach((values) => {
          values.forEach(i => usedItems.push(i.name));
        });
        Randomizer.randomize(allItems);
        const otherItems = allItems.filter(i => usedItems.indexOf(i.name) === -1)
          .splice(0, this.settingsService.getConfigInt(SettingsService.SEASONS_EXTRA_ITEM_COUNT, 6));
        this.dialog.open(SelectContextItemsComponent, {
          data: {
            themePics: season.pics,
            items: items,
            otherItems: otherItems
          },
          height: '100%',
          width: '100%',
          maxHeight: '100%',
          maxWidth: '100%',
        });
      });
    });

  }
}
