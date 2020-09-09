import {
  MILLISECONDS_A_SECOND, MILLISECONDS_A_MINUTE, MILLISECONDS_A_HOUR, MILLISECONDS_A_DAY, MILLISECONDS_A_WEEK,
  MS, S, MIN, H, D, W, M, Q, Y, DATE, FORMAT_DEFAULT, INVALID_DATE_STRING, REGEX_PARSE, REGEX_FORMAT
} from './constant';
import U from './utils';
import en from './locale/en';

let Locale = 'en'; // global locale
const LoadedLocale = {}; // global loaded locale
LoadedLocale[Locale] = en;

const isDayjs = (d) => d instanceof Dayjs; // eslint-disable-line no-use-before-define

const parseLocale = (preset, object, isLocal) => {
  let l;
  if (!preset) return Locale;
  if (typeof preset === 'string') {
    if (LoadedLocale[preset]) {
      l = preset;
    }
    if (object) {
      LoadedLocale[preset] = object;
      l = preset;
    }
  } else {
    const {name} = preset;
    LoadedLocale[name] = preset;
    l = name;
  }
  if (!isLocal && l) Locale = l;
  return l || (!isLocal && Locale);
};

const dayjs = function (date, c) {
  if (isDayjs(date)) {
    return date.clone();
  }
  // eslint-disable-next-line no-nested-ternary
  const cfg = typeof c === 'object' ? c : {};
  cfg.date = date;
  cfg.args = arguments; // eslint-disable-line prefer-rest-params
  return new Dayjs(cfg); // eslint-disable-line no-use-before-define
};

const wrapper = (date, instance) =>
  dayjs(date, {
    locale: instance.$L,
    utc: instance.$u,
    $offset: instance.$offset, // todo: refactor; do not use this.$offset in you code
  });

const Utils = U; // for plugin use
Utils.parseLocale = parseLocale;
Utils.isDayjs = isDayjs;
Utils.wrapper = wrapper;

const parseDate = (cfg) => {
  const {date, utc} = cfg;
  if (date === null) return new Date(NaN); // null is invalid
  if (Utils.isUndefined(date)) return new Date(); // today
  if (date instanceof Date) return new Date(date);
  if (typeof date === 'string' && !/Z$/i.test(date)) {
    const d = date.match(REGEX_PARSE);
    if (d) {
      const m = d[2] - 1 || 0;
      const ms = (d[7] || '0').substring(0, 3);
      if (utc) {
        return new Date(Date.UTC(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms));
      }
      return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms);
    }
  }

  return new Date(date); // everything else
};

class Dayjs {
  constructor(cfg) {
    this.$L = this.$L || parseLocale(cfg.locale, null, true);
    this.parse(cfg); // for plugin
  }

  parse(cfg) {
    this.$d = parseDate(cfg);
    this.init();
  }

  init() {
    const {$d} = this;
    this.$y = $d.getFullYear();
    this.$M = $d.getMonth();
    this.$D = $d.getDate();
    this.$W = $d.getDay();
    this.$H = $d.getHours();
    this.$m = $d.getMinutes();
    this.$s = $d.getSeconds();
    this.$ms = $d.getMilliseconds();
  }

  // eslint-disable-next-line class-methods-use-this
  $utils() {
    return Utils;
  }

  isValid() {
    return !(this.$d.toString() === INVALID_DATE_STRING);
  }

  isSame(that, units) {
    const other = dayjs(that);
    return this.startOf(units) <= other && other <= this.endOf(units);
  }

  isAfter(that, units) {
    return dayjs(that) < this.startOf(units);
  }

  isBefore(that, units) {
    return this.endOf(units) < dayjs(that);
  }

  $g(input, get, set) {
    if (Utils.isUndefined(input)) return this[get];
    return this.set(set, input);
  }

  unix() {
    return Math.floor(this.valueOf() / 1000);
  }

  valueOf() {
    // timezone(hour) * 60 * 60 * 1000 => ms
    return this.$d.getTime();
  }

  startOf(units, startOf) {
    // startOf -> endOf
    const isStartOf = !Utils.isUndefined(startOf) ? startOf : true;
    const unit = Utils.prettyUnit(units);
    const instanceFactory = (d, m) => {
      const ins = Utils.wrapper(this.$u ? Date.UTC(this.$y, m, d) : new Date(this.$y, m, d), this);
      return isStartOf ? ins : ins.endOf(D);
    };
    const instanceFactorySet = (method, slice) => {
      const argumentStart = [0, 0, 0, 0];
      const argumentEnd = [23, 59, 59, 999];
      return Utils.wrapper(
        this.toDate()[method].apply(
          // eslint-disable-line prefer-spread
          this.toDate('s'),
          (isStartOf ? argumentStart : argumentEnd).slice(slice),
        ),
        this,
      );
    };
    const {$W, $M, $D} = this;
    const utcPad = `set${this.$u ? 'UTC' : ''}`;
    switch (unit) {
      case Y:
        return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);
      case M:
        return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1);
      case W: {
        const weekStart = this.$locale().weekStart || 0;
        const gap = ($W < weekStart ? $W + 7 : $W) - weekStart;
        return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M);
      }
      case D:
      case DATE:
        return instanceFactorySet(`${utcPad}Hours`, 0);
      case H:
        return instanceFactorySet(`${utcPad}Minutes`, 1);
      case MIN:
        return instanceFactorySet(`${utcPad}Seconds`, 2);
      case S:
        return instanceFactorySet(`${utcPad}Milliseconds`, 3);
      default:
        return this.clone();
    }
  }

  endOf(arg) {
    return this.startOf(arg, false);
  }

  $set(units, int) {
    // private set
    const unit = Utils.prettyUnit(units);
    const utcPad = `set${this.$u ? 'UTC' : ''}`;
    const name = {
      [D]: `${utcPad}Date`,
      [DATE]: `${utcPad}Date`,
      [M]: `${utcPad}Month`,
      [Y]: `${utcPad}FullYear`,
      [H]: `${utcPad}Hours`,
      [MIN]: `${utcPad}Minutes`,
      [S]: `${utcPad}Seconds`,
      [MS]: `${utcPad}Milliseconds`,
    }[unit];
    const arg = unit === D ? this.$D + (int - this.$W) : int;

    if (unit === M || unit === Y) {
      // clone is for badMutable plugin
      const date = this.clone().set(DATE, 1);
      date.$d[name](arg);
      date.init();
      this.$d = date.set(DATE, Math.min(this.$D, date.daysInMonth())).$d;
    } else if (name) this.$d[name](arg);

    this.init();
    return this;
  }

  set(string, int) {
    return this.clone().$set(string, int);
  }

  get(unit) {
    return this[Utils.prettyUnit(unit)]();
  }

  add(number, units) {
    number = Number(number); // eslint-disable-line no-param-reassign
    const unit = Utils.prettyUnit(units);
    const instanceFactorySet = (n) => {
      const d = dayjs(this);
      return Utils.wrapper(d.date(d.date() + Math.round(n * number)), this);
    };
    if (unit === M) {
      return this.set(M, this.$M + number);
    }
    if (unit === Y) {
      return this.set(Y, this.$y + number);
    }
    if (unit === D) {
      return instanceFactorySet(1);
    }
    if (unit === W) {
      return instanceFactorySet(7);
    }
    const step =
      {
        [MIN]: MILLISECONDS_A_MINUTE,
        [H]: MILLISECONDS_A_HOUR,
        [S]: MILLISECONDS_A_SECOND,
      }[unit] || 1; // ms

    const nextTimeStamp = this.$d.getTime() + number * step;
    return Utils.wrapper(nextTimeStamp, this);
  }

  subtract(number, string) {
    return this.add(number * -1, string);
  }

  format(formatStr) {
    if (!this.isValid()) return INVALID_DATE_STRING;

    const str = formatStr || FORMAT_DEFAULT;
    const zoneStr = Utils.padZoneStr(this);
    const locale = this.$locale();
    const {$H, $m, $M} = this;
    const {weekdays, months, meridiem} = locale;
    const getShort = (arr, index, full, length) =>
      (arr && (arr[index] || arr(this, str))) || full[index].substr(0, length);
    const get$H = (num) => Utils.padStart($H % 12 || 12, num, '0');

    const meridiemFunc =
      meridiem ||
      ((hour, minute, isLowercase) => {
        const m = hour < 12 ? 'AM' : 'PM';
        return isLowercase ? m.toLowerCase() : m;
      });

    const matches = {
      YY: String(this.$y).slice(-2),
      YYYY: this.$y,
      M: $M + 1,
      MM: Utils.padStart($M + 1, 2, '0'),
      MMM: getShort(locale.monthsShort, $M, months, 3),
      MMMM: getShort(months, $M),
      D: this.$D,
      DD: Utils.padStart(this.$D, 2, '0'),
      d: String(this.$W),
      dd: getShort(locale.weekdaysMin, this.$W, weekdays, 2),
      ddd: getShort(locale.weekdaysShort, this.$W, weekdays, 3),
      dddd: weekdays[this.$W],
      H: String($H),
      HH: Utils.padStart($H, 2, '0'),
      h: get$H(1),
      hh: get$H(2),
      a: meridiemFunc($H, $m, true),
      A: meridiemFunc($H, $m, false),
      m: String($m),
      mm: Utils.padStart($m, 2, '0'),
      s: String(this.$s),
      ss: Utils.padStart(this.$s, 2, '0'),
      SSS: Utils.padStart(this.$ms, 3, '0'),
      Z: zoneStr, // 'ZZ' logic below
    };

    return str.replace(REGEX_FORMAT, (match, $1) => $1 || matches[match] || zoneStr.replace(':', '')); // 'ZZ'
  }

  utcOffset() {
    // Because a bug at FF24, we're rounding the timezone offset around 15 minutes
    // https://github.com/moment/moment/pull/1871
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  }

  diff(input, units, float) {
    const unit = Utils.prettyUnit(units);
    const that = dayjs(input);
    const zoneDelta = (that.utcOffset() - this.utcOffset()) * MILLISECONDS_A_MINUTE;
    const diff = this - that;
    let result = Utils.monthDiff(this, that);

    result =
      {
        [Y]: result / 12,
        [M]: result,
        [Q]: result / 3,
        [W]: (diff - zoneDelta) / MILLISECONDS_A_WEEK,
        [D]: (diff - zoneDelta) / MILLISECONDS_A_DAY,
        [H]: diff / MILLISECONDS_A_HOUR,
        [MIN]: diff / MILLISECONDS_A_MINUTE,
        [S]: diff / MILLISECONDS_A_SECOND,
      }[unit] || diff; // milliseconds

    return float ? result : Utils.absFloor(result);
  }

  daysInMonth() {
    return this.endOf(M).$D;
  }

  $locale() {
    // get locale object
    return LoadedLocale[this.$L];
  }

  locale(preset, object) {
    if (!preset) return this.$L;
    const that = this.clone();
    const nextLocaleName = parseLocale(preset, object, true);
    if (nextLocaleName) that.$L = nextLocaleName;
    return that;
  }

  clone() {
    return Utils.wrapper(this.$d, this);
  }

  toDate() {
    return new Date(this.valueOf());
  }

  toJSON() {
    return this.isValid() ? this.toISOString() : null;
  }

  toISOString() {
    // ie 8 return
    // new Dayjs(this.valueOf() + this.$d.getTimezoneOffset() * 60000)
    // .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    return this.$d.toISOString();
  }

  toString() {
    return this.$d.toUTCString();
  }
}

const proto = Dayjs.prototype;
dayjs.prototype = proto;
[
  ['$ms', MS],
  ['$s', S],
  ['$m', MIN],
  ['$H', H],
  ['$W', D],
  ['$M', M],
  ['$y', Y],
  ['$D', DATE],
].forEach((g) => {
  proto[g[1]] = function (input) {
    return this.$g(input, g[0], g[1]);
  };
});

dayjs.extend = (plugin, option) => {
  plugin(option, Dayjs, dayjs);
  return dayjs;
};

dayjs.locale = parseLocale;

dayjs.isDayjs = isDayjs;

dayjs.unix = (timestamp) => dayjs(timestamp * 1e3);

dayjs.en = LoadedLocale[Locale];
dayjs.Ls = LoadedLocale;

export default dayjs;
