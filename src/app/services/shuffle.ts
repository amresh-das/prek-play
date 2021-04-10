export class Randomizer {

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

}
