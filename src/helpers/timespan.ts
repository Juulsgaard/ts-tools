
/**
 * Utility class to generate timespans in Milliseconds
 * @category Timespan
 */
export class Timespan {

  static seconds(s: number) {
    return Math.floor(s * 1000);
  }

  static minutes(m: number, s = 0) {
    return Timespan.seconds(m * 60) + Timespan.seconds(s);
  }

  static hours(h: number, m = 0, s = 0) {
    return Timespan.minutes(h * 60) + Timespan.minutes(m, s);
  }

  static days(d: number, h = 0, m = 0, s = 0) {
    return Timespan.hours(d * 24) + Timespan.hours(h, m, s);
  }

  static weeks(w: number, d = 0, h = 0, m = 0, s = 0) {
    return Timespan.days(w * 7) + Timespan.days(d, h, m, s);
  }
}
