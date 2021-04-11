export interface Item {
  name: string;
  pics?: string[];
}

export interface Season {
  name: string;
  pics?: string[];
  items?: Map<string, string[]>;
}
