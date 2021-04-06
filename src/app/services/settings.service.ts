import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class SettingsService {
  static PHONICS_SHOW_WORDS_BATCH_COUNT = 'phonics.show.words.batch.count';
  static SEASONS_EXTRA_ITEM_COUNT = 'seasons.extra.item.count';

  getConfig(key: string, defaultVal?: string): string | undefined {
    const item = localStorage.getItem(key);
    return item ? item : defaultVal;
  }

  getConfigInt(key: string, defaultVal?: number): number | undefined {
    const item = localStorage.getItem(key);
    return item ? Number.parseInt(item) : defaultVal;
  }

  getConfigFloat(key: string, defaultVal?: number): number | undefined {
    const item = localStorage.getItem(key);
    return item ? Number.parseFloat(item) : defaultVal;
  }

  getConfigObj(key: string, defaultVal?: any): any | undefined {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  }

}
