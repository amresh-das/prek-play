import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class SettingsService {
  static PHONICS_SHOW_WORDS_BATCH_COUNT = 'phonics.show.words.batch.count';
  static PHONICS_WORDS_FONT_SIZE = 'phonics.words.font.size';
  static PHONICS_HIDDEN_WORDS = "phonics.hidden.words";
  static SEASONS_MIN_EXTRA_ITEM_COUNT = 'seasons.min.extra.item.count';
  static SEASONS_MAX_EXTRA_ITEM_COUNT = 'seasons.max.extra.item.count';

  getConfig(key: string, defaultVal?: string): string | undefined {
    const item = localStorage.getItem(key);
    return item ? item : defaultVal;
  }

  getConfigOrDefault(key: string, defaultVal: string): string {
    const item = localStorage.getItem(key);
    return item ? item : defaultVal;
  }

  getConfigInt(key: string, defaultVal?: number): number | undefined {
    const item = localStorage.getItem(key);
    return item ? Number.parseInt(item) : defaultVal;
  }

  getConfigIntOrDefault(key: string, defaultVal: number): number {
    const item = localStorage.getItem(key);
    return item ? Number.parseInt(item) : defaultVal;
  }

  getConfigFloat(key: string, defaultVal?: number): number | undefined {
    const item = localStorage.getItem(key);
    return item ? Number.parseFloat(item) : defaultVal;
  }

  getConfigFloatOrDefault(key: string, defaultVal: number): number {
    const item = localStorage.getItem(key);
    return item ? Number.parseFloat(item) : defaultVal;
  }

  getConfigObj(key: string, defaultVal?: any): any | undefined {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  }

  getConfigObjOrDefault(key: string, defaultVal: any): any  {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  }

  setConfig(key: string, value: string) {
    localStorage.setItem(key, value);
  }

}
