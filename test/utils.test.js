import Utils from '../src/utils';
import {MINUTES_A_HOUR} from '../src/constant';

const {prettyUnit, padStart, padZoneStr} = Utils;

it('PrettyUnit', () => {
  expect(prettyUnit('Days')).toBe('day');
  expect(prettyUnit('days')).toBe('day');
  expect(prettyUnit('day')).toBe('day');
  expect(prettyUnit('quarter')).toBe('quarter');
  expect(prettyUnit('quarters')).toBe('quarter');
  expect(prettyUnit('D')).toBe('date');
  expect(prettyUnit('d')).toBe('day');
  expect(prettyUnit('M')).toBe('month');
  expect(prettyUnit('y')).toBe('year');
  expect(prettyUnit('h')).toBe('hour');
  expect(prettyUnit('m')).toBe('minute');
  expect(prettyUnit('s')).toBe('second');
  expect(prettyUnit('ms')).toBe('millisecond');
  expect(prettyUnit('Q')).toBe('quarter');
  expect(prettyUnit()).toBe('');
});

it('PadZoneStr', () => {
  const instance = {};
  instance.utcOffset = () => 0 * -1;
  expect(padZoneStr(instance)).toBe('+00:00');
  instance.utcOffset = () => MINUTES_A_HOUR * -1;
  expect(padZoneStr(instance)).toBe('-01:00');
  instance.utcOffset = () => -1 * MINUTES_A_HOUR * -1;
  expect(padZoneStr(instance)).toBe('+01:00');
  instance.utcOffset = () => -10 * MINUTES_A_HOUR * -1;
  expect(padZoneStr(instance)).toBe('+10:00');
  instance.utcOffset = () => 10 * MINUTES_A_HOUR * -1;
  expect(padZoneStr(instance)).toBe('-10:00');
  instance.utcOffset = () => (-5 * MINUTES_A_HOUR - 30) * -1;
  expect(padZoneStr(instance)).toBe('+05:30');
});

it('PadStart', () => {
  expect(padStart(1, 2, '0')).toBe('01');
  expect(padStart(0, 2, '0')).toBe('00');
});
