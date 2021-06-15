export class Randomizer {
  private static readonly CHARS = 'abcdefghijklmnopqrstuvwxyz';
  private static readonly COLORCHARS = '0123456789ABCDEF';

  public static randomize(array: any[]) {
    if (!array) return;
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  public static randomInt(endExclusive?: number, startInclusive?: number): number {
    const max = endExclusive === undefined ? 10000 : endExclusive - 1;
    const min = startInclusive === undefined ? 0 : startInclusive;
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  public static randomString(length?: number): string {
    const count = length ? length : Randomizer.randomInt(10);
    let result = '';
    for (let i = 0; i < count; i++) {
      result = result + Randomizer.CHARS.charAt(Randomizer.randomInt(Randomizer.CHARS.length));
    }
    return result;
  }

  public static randomColor(except?: any[]) {
    let color;
    do {
      color = '#';
      for (let i = 0; i < 6; i++) {
        color = color + Randomizer.COLORCHARS[Math.floor(Math.random() * 16)];
      }
      console.log(color, except?.indexOf(color));
    } while (except && except.indexOf(color) != -1);
    return color;
  }
}
