import MockDate from 'mockdate';
import dayjs from '../src';

beforeEach(() => {
  MockDate.set(new Date());
});

afterEach(() => {
  MockDate.reset();
});

test('is same without units', () => {
  const m = dayjs(new Date(2011, 3, 2, 3, 4, 5, 10));
  const mCopy = dayjs(m);

  expect(m.isSame(dayjs(new Date(2012, 3, 2, 3, 5, 5, 10)))).toBe(false, 'year is later');
  expect(m.isSame(dayjs(new Date(2010, 3, 2, 3, 3, 5, 10)))).toBe(false, 'year is earlier');
  expect(m.isSame(dayjs(new Date(2011, 4, 2, 3, 4, 5, 10)))).toBe(false, 'month is later');
  expect(m.isSame(dayjs(new Date(2011, 2, 2, 3, 4, 5, 10)))).toBe(false, 'month is earlier');
  expect(m.isSame(dayjs(new Date(2011, 3, 3, 3, 4, 5, 10)))).toBe(false, 'day is later');
  expect(m.isSame(dayjs(new Date(2011, 3, 1, 3, 4, 5, 10)))).toBe(false, 'day is earlier');
  expect(m.isSame(dayjs(new Date(2011, 3, 2, 4, 4, 5, 10)))).toBe(false, 'hour is later');
  expect(m.isSame(dayjs(new Date(2011, 3, 2, 2, 4, 5, 10)))).toBe(false, 'hour is earlier');
  expect(m.isSame(dayjs(new Date(2011, 3, 2, 3, 5, 5, 10)))).toBe(false, 'minute is later');
  expect(m.isSame(dayjs(new Date(2011, 3, 2, 3, 3, 5, 10)))).toBe(false, 'minute is earlier');
  expect(m.isSame(dayjs(new Date(2011, 3, 2, 3, 4, 6, 10)))).toBe(false, 'second is later');
  expect(m.isSame(dayjs(new Date(2011, 3, 2, 3, 4, 4, 11)))).toBe(false, 'second is earlier');
  expect(m.isSame(dayjs(new Date(2011, 3, 2, 3, 4, 5, 10)))).toBe(true, 'millisecond match');
  expect(m.isSame(dayjs(new Date(2011, 3, 2, 3, 4, 5, 11)))).toBe(false, 'millisecond is later');
  expect(m.isSame(dayjs(new Date(2011, 3, 2, 3, 4, 5, 9)))).toBe(false, 'millisecond is earlier');
  expect(m.isSame(m)).toBe(true, 'moments are the same as themselves');
  expect(+m).toEqual(+mCopy, 'isSame second should not change moment');
});

test('is same year', () => {
  const m = dayjs(new Date(2011, 1, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isSame(dayjs(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year')).toBe(true, 'year match');
  expect(m.isSame(dayjs(new Date(2011, 5, 6, 7, 8, 9, 10)), 'years')).toBe(true, 'plural should work');
  expect(m.isSame(dayjs(new Date(2012, 5, 6, 7, 8, 9, 10)), 'year')).toBe(false, 'year mismatch');
  expect(m.isSame(dayjs(new Date(2011, 0, 1, 0, 0, 0, 0)), 'year')).toBe(true, 'exact start of year');
  expect(m.isSame(dayjs(new Date(2011, 11, 31, 23, 59, 59, 999)), 'year')).toBe(true, 'exact end of year');
  expect(m.isSame(dayjs(new Date(2012, 0, 1, 0, 0, 0, 0)), 'year')).toBe(false, 'start of next year');
  expect(m.isSame(dayjs(new Date(2010, 11, 31, 23, 59, 59, 999)), 'year')).toBe(false, 'end of previous year');
  expect(m.isSame(m, 'year')).toBe(true, 'same moments are in the same year');
  expect(+m).toEqual(+mCopy, 'isSame year should not change moment');
});

test('is same month', () => {
  const m = dayjs(new Date(2011, 2, 3, 4, 5, 6, 7));
  const mCopy = dayjs(m);
  expect(m.isSame(dayjs(new Date(2011, 2, 6, 7, 8, 9, 10)), 'month')).toBe(true, 'month match');
  expect(m.isSame(dayjs(new Date(2011, 2, 6, 7, 8, 9, 10)), 'months')).toBe(true, 'plural should work');
  expect(m.isSame(dayjs(new Date(2012, 2, 6, 7, 8, 9, 10)), 'month')).toBe(false, 'year mismatch');
  expect(m.isSame(dayjs(new Date(2011, 5, 6, 7, 8, 9, 10)), 'month')).toBe(false, 'month mismatch');
  expect(m.isSame(dayjs(new Date(2011, 2, 1, 0, 0, 0, 0)), 'month')).toBe(true, 'exact start of month');
  expect(m.isSame(dayjs(new Date(2011, 2, 31, 23, 59, 59, 999)), 'month')).toBe(true, 'exact end of month');
  expect(m.isSame(dayjs(new Date(2011, 3, 1, 0, 0, 0, 0)), 'month')).toBe(false, 'start of next month');
  expect(m.isSame(dayjs(new Date(2011, 1, 27, 23, 59, 59, 999)), 'month')).toBe(false, 'end of previous month');
  expect(m.isSame(m, 'month')).toBe(true, 'same moments are in the same month');
  expect(+m).toEqual(+mCopy, 'isSame month should not change moment');
});

test('is same day', () => {
  const m = dayjs(new Date(2011, 1, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 7, 8, 9, 10)), 'day')).toBe(true, 'day match');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 7, 8, 9, 10)), 'days')).toBe(true, 'plural should work');
  expect(m.isSame(dayjs(new Date(2012, 1, 2, 7, 8, 9, 10)), 'day')).toBe(false, 'year mismatch');
  expect(m.isSame(dayjs(new Date(2011, 2, 2, 7, 8, 9, 10)), 'day')).toBe(false, 'month mismatch');
  expect(m.isSame(dayjs(new Date(2011, 1, 3, 7, 8, 9, 10)), 'day')).toBe(false, 'day mismatch');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 0, 0, 0, 0)), 'day')).toBe(true, 'exact start of day');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 23, 59, 59, 999)), 'day')).toBe(true, 'exact end of day');
  expect(m.isSame(dayjs(new Date(2011, 1, 3, 0, 0, 0, 0)), 'day')).toBe(false, 'start of next day');
  expect(m.isSame(dayjs(new Date(2011, 1, 1, 23, 59, 59, 999)), 'day')).toBe(false, 'end of previous day');
  expect(m.isSame(m, 'day')).toBe(true, 'same moments are in the same day');
  expect(+m).toEqual(+mCopy, 'isSame day should not change moment');
});

test('is same hour', () => {
  const m = dayjs(new Date(2011, 1, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hour')).toBe(true, 'hour match');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hours')).toBe(true, 'plural should work');
  expect(m.isSame(dayjs(new Date(2012, 1, 2, 3, 8, 9, 10)), 'hour')).toBe(false, 'year mismatch');
  expect(m.isSame(dayjs(new Date(2011, 2, 2, 3, 8, 9, 10)), 'hour')).toBe(false, 'month mismatch');
  expect(m.isSame(dayjs(new Date(2011, 1, 3, 3, 8, 9, 10)), 'hour')).toBe(false, 'day mismatch');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 4, 8, 9, 10)), 'hour')).toBe(false, 'hour mismatch');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 3, 0, 0, 0)), 'hour')).toBe(true, 'exact start of hour');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 3, 59, 59, 999)), 'hour')).toBe(true, 'exact end of hour');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 4, 0, 0, 0)), 'hour')).toBe(false, 'start of next hour');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 2, 59, 59, 999)), 'hour')).toBe(false, 'end of previous hour');
  expect(m.isSame(m, 'hour')).toBe(true, 'same moments are in the same hour');
  expect(+m).toEqual(+mCopy, 'isSame hour should not change moment');
});

test('is same minute', () => {
  const m = dayjs(new Date(2011, 1, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 3, 4, 9, 10)), 'minute')).toBe(true, 'minute match');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 3, 4, 9, 10)), 'minutes')).toBe(true, 'plural should work');
  expect(m.isSame(dayjs(new Date(2012, 1, 2, 3, 4, 9, 10)), 'minute')).toBe(false, 'year mismatch');
  expect(m.isSame(dayjs(new Date(2011, 2, 2, 3, 4, 9, 10)), 'minute')).toBe(false, 'month mismatch');
  expect(m.isSame(dayjs(new Date(2011, 1, 3, 3, 4, 9, 10)), 'minute')).toBe(false, 'day mismatch');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 4, 4, 9, 10)), 'minute')).toBe(false, 'hour mismatch');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 3, 5, 9, 10)), 'minute')).toBe(false, 'minute mismatch');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 3, 4, 0, 0)), 'minute')).toBe(true, 'exact start of minute');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 3, 4, 59, 999)), 'minute')).toBe(true, 'exact end of minute');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 3, 5, 0, 0)), 'minute')).toBe(false, 'start of next minute');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 3, 3, 59, 999)), 'minute')).toBe(false, 'end of previous minute');
  expect(m.isSame(m, 'minute')).toBe(true, 'same moments are in the same minute');
  expect(+m).toEqual(+mCopy, 'isSame minute should not change moment');
});

test('is same second', () => {
  const m = dayjs(new Date(2011, 1, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 3, 4, 5, 10)), 'second')).toBe(true, 'second match');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 3, 4, 5, 10)), 'seconds')).toBe(true, 'plural should work');
  expect(m.isSame(dayjs(new Date(2012, 1, 2, 3, 4, 5, 10)), 'second')).toBe(false, 'year mismatch');
  expect(m.isSame(dayjs(new Date(2011, 2, 2, 3, 4, 5, 10)), 'second')).toBe(false, 'month mismatch');
  expect(m.isSame(dayjs(new Date(2011, 1, 3, 3, 4, 5, 10)), 'second')).toBe(false, 'day mismatch');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 4, 4, 5, 10)), 'second')).toBe(false, 'hour mismatch');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 3, 5, 5, 10)), 'second')).toBe(false, 'minute mismatch');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 3, 4, 6, 10)), 'second')).toBe(false, 'second mismatch');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 3, 4, 5, 0)), 'second')).toBe(true, 'exact start of second');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 3, 4, 5, 999)), 'second')).toBe(true, 'exact end of second');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 3, 4, 6, 0)), 'second')).toBe(false, 'start of next second');
  expect(m.isSame(dayjs(new Date(2011, 1, 2, 3, 4, 4, 999)), 'second')).toBe(false, 'end of previous second');
  expect(m.isSame(m, 'second')).toBe(true, 'same moments are in the same second');
  expect(+m).toEqual(+mCopy, 'isSame second should not change moment');
});

test('is same millisecond', () => {
  const m = dayjs(new Date(2011, 3, 2, 3, 4, 5, 10));
  const mCopy = dayjs(m);
  expect(m.isSame(dayjs(new Date(2011, 3, 2, 3, 4, 5, 10)), 'millisecond')).toBe(true, 'millisecond match');
  expect(m.isSame(dayjs(new Date(2011, 3, 2, 3, 4, 5, 10)), 'milliseconds')).toBe(true, 'plural should work');
  expect(m.isSame(dayjs(new Date(2012, 3, 2, 3, 4, 5, 10)), 'millisecond')).toBe(false, 'year is later');
  expect(m.isSame(dayjs(new Date(2010, 3, 2, 3, 4, 5, 10)), 'millisecond')).toBe(false, 'year is earlier');
  expect(m.isSame(dayjs(new Date(2011, 4, 2, 3, 4, 5, 10)), 'millisecond')).toBe(false, 'month is later');
  expect(m.isSame(dayjs(new Date(2011, 2, 2, 3, 4, 5, 10)), 'millisecond')).toBe(false, 'month is earlier');
  expect(m.isSame(dayjs(new Date(2011, 3, 3, 3, 4, 5, 10)), 'millisecond')).toBe(false, 'day is later');
  expect(m.isSame(dayjs(new Date(2011, 3, 1, 1, 4, 5, 10)), 'millisecond')).toBe(false, 'day is earlier');
  expect(m.isSame(dayjs(new Date(2011, 3, 2, 4, 4, 5, 10)), 'millisecond')).toBe(false, 'hour is later');
  expect(m.isSame(dayjs(new Date(2011, 3, 1, 4, 1, 5, 10)), 'millisecond')).toBe(false, 'hour is earlier');
  expect(m.isSame(dayjs(new Date(2011, 3, 2, 3, 5, 5, 10)), 'millisecond')).toBe(false, 'minute is later');
  expect(m.isSame(dayjs(new Date(2011, 3, 2, 3, 3, 5, 10)), 'millisecond')).toBe(false, 'minute is earlier');
  expect(m.isSame(dayjs(new Date(2011, 3, 2, 3, 4, 6, 10)), 'millisecond')).toBe(false, 'second is later');
  expect(m.isSame(dayjs(new Date(2011, 3, 2, 3, 4, 4, 5)), 'millisecond')).toBe(false, 'second is earlier');
  expect(m.isSame(dayjs(new Date(2011, 3, 2, 3, 4, 6, 11)), 'millisecond')).toBe(false, 'millisecond is later');
  expect(m.isSame(dayjs(new Date(2011, 3, 2, 3, 4, 4, 9)), 'millisecond')).toBe(false, 'millisecond is earlier');
  expect(m.isSame(m, 'millisecond')).toBe(true, 'same moments are in the same millisecond');
  expect(+m).toEqual(+mCopy, 'isSame millisecond should not change moment');
});

test('is same with invalid moments', () => {
  expect(dayjs(null).isSame(dayjs('2018-01-01'))).toBe(false, 'invalid moments are not considered equal');
  expect(dayjs('2018-01-01').isSame(dayjs(null))).toBe(false, 'invalid moments are not considered equal');
});

// isAfter()

test('is after year', () => {
  const m = dayjs(new Date(2011, 1, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isAfter(dayjs(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year')).toBe(false, 'year match');
  expect(m.isAfter(dayjs(new Date(2010, 5, 6, 7, 8, 9, 10)), 'years')).toBe(true, 'plural should work');
  expect(m.isAfter(dayjs(new Date(2013, 5, 6, 7, 8, 9, 10)), 'year')).toBe(false, 'year is later');
  expect(m.isAfter(dayjs(new Date(2010, 5, 6, 7, 8, 9, 10)), 'year')).toBe(true, 'year is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 0, 1, 0, 0, 0, 0)), 'year')).toBe(false, 'exact start of year');
  expect(m.isAfter(dayjs(new Date(2011, 11, 31, 23, 59, 59, 999)), 'year')).toBe(false, 'exact end of year');
  expect(m.isAfter(dayjs(new Date(2012, 0, 1, 0, 0, 0, 0)), 'year')).toBe(false, 'start of next year');
  expect(m.isAfter(dayjs(new Date(2010, 11, 31, 23, 59, 59, 999)), 'year')).toBe(true, 'end of previous year');
  expect(m.isAfter(dayjs(new Date(1980, 11, 31, 23, 59, 59, 999)), 'year')).toBe(true, 'end of year far before');
  expect(m.isAfter(m, 'year')).toBe(false, 'same moments are not after the same year');
  expect(+m).toEqual(+mCopy, 'isAfter year should not change moment');
});

test('is after month', () => {
  const m = dayjs(new Date(2011, 2, 3, 4, 5, 6, 7));
  const mCopy = dayjs(m);
  expect(m.isAfter(dayjs(new Date(2011, 2, 6, 7, 8, 9, 10)), 'month')).toBe(false, 'month match');
  expect(m.isAfter(dayjs(new Date(2010, 2, 6, 7, 8, 9, 10)), 'months')).toBe(true, 'plural should work');
  expect(m.isAfter(dayjs(new Date(2012, 2, 6, 7, 8, 9, 10)), 'month')).toBe(false, 'year is later');
  expect(m.isAfter(dayjs(new Date(2010, 2, 6, 7, 8, 9, 10)), 'month')).toBe(true, 'year is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 5, 6, 7, 8, 9, 10)), 'month')).toBe(false, 'month is later');
  expect(m.isAfter(dayjs(new Date(2011, 1, 6, 7, 8, 9, 10)), 'month')).toBe(true, 'month is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 2, 1, 0, 0, 0, 0)), 'month')).toBe(false, 'exact start of month');
  expect(m.isAfter(dayjs(new Date(2011, 2, 31, 23, 59, 59, 999)), 'month')).toBe(false, 'exact end of month');
  expect(m.isAfter(dayjs(new Date(2011, 3, 1, 0, 0, 0, 0)), 'month')).toBe(false, 'start of next month');
  expect(m.isAfter(dayjs(new Date(2011, 1, 27, 23, 59, 59, 999)), 'month')).toBe(true, 'end of previous month');
  expect(m.isAfter(dayjs(new Date(2010, 12, 31, 23, 59, 59, 999)), 'month')).toBe(true, 'later month but earlier year');
  expect(m.isAfter(m, 'month')).toBe(false, 'same moments are not after the same month');
  expect(+m).toEqual(+mCopy, 'isAfter month should not change moment');
});

test('is after day', () => {
  const m = dayjs(new Date(2011, 3, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 7, 8, 9, 10)), 'day')).toBe(false, 'day match');
  expect(m.isAfter(dayjs(new Date(2010, 3, 2, 7, 8, 9, 10)), 'days')).toBe(true, 'plural should work');
  expect(m.isAfter(dayjs(new Date(2012, 3, 2, 7, 8, 9, 10)), 'day')).toBe(false, 'year is later');
  expect(m.isAfter(dayjs(new Date(2010, 3, 2, 7, 8, 9, 10)), 'day')).toBe(true, 'year is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 4, 2, 7, 8, 9, 10)), 'day')).toBe(false, 'month is later');
  expect(m.isAfter(dayjs(new Date(2011, 2, 2, 7, 8, 9, 10)), 'day')).toBe(true, 'month is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 3, 7, 8, 9, 10)), 'day')).toBe(false, 'day is later');
  expect(m.isAfter(dayjs(new Date(2011, 3, 1, 7, 8, 9, 10)), 'day')).toBe(true, 'day is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 0, 0, 0, 0)), 'day')).toBe(false, 'exact start of day');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 23, 59, 59, 999)), 'day')).toBe(false, 'exact end of day');
  expect(m.isAfter(dayjs(new Date(2011, 3, 3, 0, 0, 0, 0)), 'day')).toBe(false, 'start of next day');
  expect(m.isAfter(dayjs(new Date(2011, 3, 1, 23, 59, 59, 999)), 'day')).toBe(true, 'end of previous day');
  expect(m.isAfter(dayjs(new Date(2010, 3, 10, 0, 0, 0, 0)), 'day')).toBe(true, 'later day but earlier year');
  expect(m.isAfter(m, 'day')).toBe(false, 'same moments are not after the same day');
  expect(+m).toEqual(+mCopy, 'isAfter day should not change moment');
});

test('is after hour', () => {
  const m = dayjs(new Date(2011, 3, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 8, 9, 10)), 'hour')).toBe(false, 'hour match');
  expect(m.isAfter(dayjs(new Date(2010, 3, 2, 3, 8, 9, 10)), 'hours')).toBe(true, 'plural should work');
  expect(m.isAfter(dayjs(new Date(2012, 3, 2, 3, 8, 9, 10)), 'hour')).toBe(false, 'year is later');
  expect(m.isAfter(dayjs(new Date(2010, 3, 2, 3, 8, 9, 10)), 'hour')).toBe(true, 'year is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 4, 2, 3, 8, 9, 10)), 'hour')).toBe(false, 'month is later');
  expect(m.isAfter(dayjs(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hour')).toBe(true, 'month is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 3, 3, 8, 9, 10)), 'hour')).toBe(false, 'day is later');
  expect(m.isAfter(dayjs(new Date(2011, 3, 1, 3, 8, 9, 10)), 'hour')).toBe(true, 'day is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 4, 8, 9, 10)), 'hour')).toBe(false, 'hour is later');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 8, 9, 10)), 'hour')).toBe(false, 'hour is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 0, 0, 0)), 'hour')).toBe(false, 'exact start of hour');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 59, 59, 999)), 'hour')).toBe(false, 'exact end of hour');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 4, 0, 0, 0)), 'hour')).toBe(false, 'start of next hour');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 2, 59, 59, 999)), 'hour')).toBe(true, 'end of previous hour');
  expect(m.isAfter(m, 'hour')).toBe(false, 'same moments are not after the same hour');
  expect(+m).toEqual(+mCopy, 'isAfter hour should not change moment');
});

test('is after minute', () => {
  const m = dayjs(new Date(2011, 3, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 4, 9, 10)), 'minute')).toBe(false, 'minute match');
  expect(m.isAfter(dayjs(new Date(2010, 3, 2, 3, 4, 9, 10)), 'minutes')).toBe(true, 'plural should work');
  expect(m.isAfter(dayjs(new Date(2012, 3, 2, 3, 4, 9, 10)), 'minute')).toBe(false, 'year is later');
  expect(m.isAfter(dayjs(new Date(2010, 3, 2, 3, 4, 9, 10)), 'minute')).toBe(true, 'year is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 4, 2, 3, 4, 9, 10)), 'minute')).toBe(false, 'month is later');
  expect(m.isAfter(dayjs(new Date(2011, 2, 2, 3, 4, 9, 10)), 'minute')).toBe(true, 'month is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 3, 3, 4, 9, 10)), 'minute')).toBe(false, 'day is later');
  expect(m.isAfter(dayjs(new Date(2011, 3, 1, 3, 4, 9, 10)), 'minute')).toBe(true, 'day is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 4, 4, 9, 10)), 'minute')).toBe(false, 'hour is later');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 2, 4, 9, 10)), 'minute')).toBe(true, 'hour is earler');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 5, 9, 10)), 'minute')).toBe(false, 'minute is later');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 3, 9, 10)), 'minute')).toBe(true, 'minute is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 4, 0, 0)), 'minute')).toBe(false, 'exact start of minute');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 4, 59, 999)), 'minute')).toBe(false, 'exact end of minute');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 5, 0, 0)), 'minute')).toBe(false, 'start of next minute');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 3, 59, 999)), 'minute')).toBe(true, 'end of previous minute');
  expect(m.isAfter(m, 'minute')).toBe(false, 'same moments are not after the same minute');
  expect(+m).toEqual(+mCopy, 'isAfter minute should not change moment');
});

test('is after second', () => {
  const m = dayjs(new Date(2011, 3, 2, 3, 4, 5, 10));
  const mCopy = dayjs(m);
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 4, 5, 10)), 'second')).toBe(false, 'second match');
  expect(m.isAfter(dayjs(new Date(2010, 3, 2, 3, 4, 5, 10)), 'seconds')).toBe(true, 'plural should work');
  expect(m.isAfter(dayjs(new Date(2012, 3, 2, 3, 4, 5, 10)), 'second')).toBe(false, 'year is later');
  expect(m.isAfter(dayjs(new Date(2010, 3, 2, 3, 4, 5, 10)), 'second')).toBe(true, 'year is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 4, 2, 3, 4, 5, 10)), 'second')).toBe(false, 'month is later');
  expect(m.isAfter(dayjs(new Date(2011, 2, 2, 3, 4, 5, 10)), 'second')).toBe(true, 'month is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 3, 3, 4, 5, 10)), 'second')).toBe(false, 'day is later');
  expect(m.isAfter(dayjs(new Date(2011, 3, 1, 1, 4, 5, 10)), 'second')).toBe(true, 'day is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 4, 4, 5, 10)), 'second')).toBe(false, 'hour is later');
  expect(m.isAfter(dayjs(new Date(2011, 3, 1, 4, 1, 5, 10)), 'second')).toBe(true, 'hour is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 5, 5, 10)), 'second')).toBe(false, 'minute is later');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 3, 5, 10)), 'second')).toBe(true, 'minute is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 4, 6, 10)), 'second')).toBe(false, 'second is later');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 4, 4, 5)), 'second')).toBe(true, 'second is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 4, 5, 0)), 'second')).toBe(false, 'exact start of second');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 4, 5, 999)), 'second')).toBe(false, 'exact end of second');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 4, 6, 0)), 'second')).toBe(false, 'start of next second');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 4, 4, 999)), 'second')).toBe(true, 'end of previous second');
  expect(m.isAfter(m, 'second')).toBe(false, 'same moments are not after the same second');
  expect(+m).toEqual(+mCopy, 'isAfter second should not change moment');
});

test('is after millisecond', () => {
  const m = dayjs(new Date(2011, 3, 2, 3, 4, 5, 10));
  const mCopy = dayjs(m);
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 4, 5, 10)), 'millisecond')).toBe(false, 'millisecond match');
  expect(m.isAfter(dayjs(new Date(2010, 3, 2, 3, 4, 5, 10)), 'milliseconds')).toBe(true, 'plural should work');
  expect(m.isAfter(dayjs(new Date(2012, 3, 2, 3, 4, 5, 10)), 'millisecond')).toBe(false, 'year is later');
  expect(m.isAfter(dayjs(new Date(2010, 3, 2, 3, 4, 5, 10)), 'millisecond')).toBe(true, 'year is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 4, 2, 3, 4, 5, 10)), 'millisecond')).toBe(false, 'month is later');
  expect(m.isAfter(dayjs(new Date(2011, 2, 2, 3, 4, 5, 10)), 'millisecond')).toBe(true, 'month is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 3, 3, 4, 5, 10)), 'millisecond')).toBe(false, 'day is later');
  expect(m.isAfter(dayjs(new Date(2011, 3, 1, 1, 4, 5, 10)), 'millisecond')).toBe(true, 'day is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 4, 4, 5, 10)), 'millisecond')).toBe(false, 'hour is later');
  expect(m.isAfter(dayjs(new Date(2011, 3, 1, 4, 1, 5, 10)), 'millisecond')).toBe(true, 'hour is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 5, 5, 10)), 'millisecond')).toBe(false, 'minute is later');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 3, 5, 10)), 'millisecond')).toBe(true, 'minute is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 4, 6, 10)), 'millisecond')).toBe(false, 'second is later');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 4, 4, 5)), 'millisecond')).toBe(true, 'second is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 4, 6, 11)), 'millisecond')).toBe(false, 'millisecond is later');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 4, 4, 9)), 'millisecond')).toBe(true, 'millisecond is earlier');
  expect(m.isAfter(m, 'millisecond')).toBe(false, 'same moments are not after the same millisecond');
  expect(+m).toEqual(+mCopy, 'isAfter millisecond should not change moment');
});

test('is after without units', () => {
  const m = dayjs(new Date(2011, 3, 2, 3, 4, 5, 10));
  const mCopy = dayjs(m);
  expect(m.isAfter(dayjs(new Date(2012, 3, 2, 3, 5, 5, 10)))).toBe(false, 'year is later');
  expect(m.isAfter(dayjs(new Date(2010, 3, 2, 3, 3, 5, 10)))).toBe(true, 'year is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 4, 2, 3, 4, 5, 10)))).toBe(false, 'month is later');
  expect(m.isAfter(dayjs(new Date(2011, 2, 2, 3, 4, 5, 10)))).toBe(true, 'month is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 3, 3, 4, 5, 10)))).toBe(false, 'day is later');
  expect(m.isAfter(dayjs(new Date(2011, 3, 1, 3, 4, 5, 10)))).toBe(true, 'day is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 4, 4, 5, 10)))).toBe(false, 'hour is later');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 2, 4, 5, 10)))).toBe(true, 'hour is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 5, 5, 10)))).toBe(false, 'minute is later');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 3, 5, 10)))).toBe(true, 'minute is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 4, 6, 10)))).toBe(false, 'second is later');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 4, 4, 11)))).toBe(true, 'second is earlier');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 4, 5, 10)))).toBe(false, 'millisecond match');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 4, 5, 11)))).toBe(false, 'millisecond is later');
  expect(m.isAfter(dayjs(new Date(2011, 3, 2, 3, 4, 5, 9)))).toBe(true, 'millisecond is earlier');
  expect(m.isAfter(m)).toBe(false, 'moments are not after themselves');
  expect(+m).toEqual(+mCopy, 'isAfter second should not change moment');
});

test('is after invalid', () => {
  const m = dayjs();
  const invalid = dayjs(null);
  expect(m.isAfter(invalid)).toBe(false, 'valid moment is not after invalid moment');
  expect(invalid.isAfter(m)).toBe(false, 'invalid moment is not after valid moment');
  expect(m.isAfter(invalid, 'year')).toBe(false, 'invalid moment year');
  expect(m.isAfter(invalid, 'month')).toBe(false, 'invalid moment month');
  expect(m.isAfter(invalid, 'day')).toBe(false, 'invalid moment day');
  expect(m.isAfter(invalid, 'hour')).toBe(false, 'invalid moment hour');
  expect(m.isAfter(invalid, 'minute')).toBe(false, 'invalid moment minute');
  expect(m.isAfter(invalid, 'second')).toBe(false, 'invalid moment second');
  expect(m.isAfter(invalid, 'milliseconds')).toBe(false, 'invalid moment milliseconds');
});

// isBefore()

test('is after without units', () => {
  const m = dayjs(new Date(2011, 3, 2, 3, 4, 5, 10));
  const mCopy = dayjs(m);
  expect(m.isBefore(dayjs(new Date(2012, 3, 2, 3, 5, 5, 10)))).toBe(true, 'year is later');
  expect(m.isBefore(dayjs(new Date(2010, 3, 2, 3, 3, 5, 10)))).toBe(false, 'year is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 4, 2, 3, 4, 5, 10)))).toBe(true, 'month is later');
  expect(m.isBefore(dayjs(new Date(2011, 2, 2, 3, 4, 5, 10)))).toBe(false, 'month is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 3, 3, 4, 5, 10)))).toBe(true, 'day is later');
  expect(m.isBefore(dayjs(new Date(2011, 3, 1, 3, 4, 5, 10)))).toBe(false, 'day is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 4, 4, 5, 10)))).toBe(true, 'hour is later');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 2, 4, 5, 10)))).toBe(false, 'hour is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 5, 5, 10)))).toBe(true, 'minute is later');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 3, 5, 10)))).toBe(false, 'minute is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 4, 6, 10)))).toBe(true, 'second is later');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 4, 4, 11)))).toBe(false, 'second is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 4, 5, 10)))).toBe(false, 'millisecond match');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 4, 5, 11)))).toBe(true, 'millisecond is later');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 4, 5, 9)))).toBe(false, 'millisecond is earlier');
  expect(m.isBefore(m)).toBe(false, 'moments are not before themselves');
  expect(+m).toEqual(+mCopy, 'isBefore second should not change moment');
});

test('is before year', () => {
  const m = dayjs(new Date(2011, 1, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isBefore(dayjs(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year')).toBe(false, 'year match');
  expect(m.isBefore(dayjs(new Date(2012, 5, 6, 7, 8, 9, 10)), 'years')).toBe(true, 'plural should work');
  expect(m.isBefore(dayjs(new Date(2013, 5, 6, 7, 8, 9, 10)), 'year')).toBe(true, 'year is later');
  expect(m.isBefore(dayjs(new Date(2010, 5, 6, 7, 8, 9, 10)), 'year')).toBe(false, 'year is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 0, 1, 0, 0, 0, 0)), 'year')).toBe(false, 'exact start of year');
  expect(m.isBefore(dayjs(new Date(2011, 11, 31, 23, 59, 59, 999)), 'year')).toBe(false, 'exact end of year');
  expect(m.isBefore(dayjs(new Date(2012, 0, 1, 0, 0, 0, 0)), 'year')).toBe(true, 'start of next year');
  expect(m.isBefore(dayjs(new Date(2010, 11, 31, 23, 59, 59, 999)), 'year')).toBe(false, 'end of previous year');
  expect(m.isBefore(dayjs(new Date(1980, 11, 31, 23, 59, 59, 999)), 'year')).toBe(false, 'end of year far before');
  expect(m.isBefore(m, 'year')).toBe(false, 'same moments are not before the same year');
  expect(+m).toEqual(+mCopy, 'isBefore year should not change moment');
});

test('is before month', () => {
  const m = dayjs(new Date(2011, 2, 3, 4, 5, 6, 7));
  const mCopy = dayjs(m);
  expect(m.isBefore(dayjs(new Date(2011, 2, 6, 7, 8, 9, 10)), 'month')).toBe(false, 'month match');
  expect(m.isBefore(dayjs(new Date(2012, 2, 6, 7, 8, 9, 10)), 'months')).toBe(true, 'plural should work');
  expect(m.isBefore(dayjs(new Date(2012, 2, 6, 7, 8, 9, 10)), 'month')).toBe(true, 'year is later');
  expect(m.isBefore(dayjs(new Date(2010, 2, 6, 7, 8, 9, 10)), 'month')).toBe(false, 'year is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 5, 6, 7, 8, 9, 10)), 'month')).toBe(true, 'month is later');
  expect(m.isBefore(dayjs(new Date(2011, 1, 6, 7, 8, 9, 10)), 'month')).toBe(false, 'month is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 2, 1, 0, 0, 0, 0)), 'month')).toBe(false, 'exact start of month');
  expect(m.isBefore(dayjs(new Date(2011, 2, 31, 23, 59, 59, 999)), 'month')).toBe(false, 'exact end of month');
  expect(m.isBefore(dayjs(new Date(2011, 3, 1, 0, 0, 0, 0)), 'month')).toBe(true, 'start of next month');
  expect(m.isBefore(dayjs(new Date(2011, 1, 27, 23, 59, 59, 999)), 'month')).toBe(false, 'end of previous month');
  expect(m.isBefore(dayjs(new Date(2010, 12, 31, 23, 59, 59, 999)), 'month')).toBe(
    false,
    'later month but earlier year',
  );
  expect(m.isBefore(m, 'month')).toBe(false, 'same moments are not before the same month');
  expect(+m).toEqual(+mCopy, 'isBefore month should not change moment');
});

test('is before day', () => {
  const m = dayjs(new Date(2011, 3, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 7, 8, 9, 10)), 'day')).toBe(false, 'day match');
  expect(m.isBefore(dayjs(new Date(2012, 3, 2, 7, 8, 9, 10)), 'days')).toBe(true, 'plural should work');
  expect(m.isBefore(dayjs(new Date(2012, 3, 2, 7, 8, 9, 10)), 'day')).toBe(true, 'year is later');
  expect(m.isBefore(dayjs(new Date(2010, 3, 2, 7, 8, 9, 10)), 'day')).toBe(false, 'year is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 4, 2, 7, 8, 9, 10)), 'day')).toBe(true, 'month is later');
  expect(m.isBefore(dayjs(new Date(2011, 2, 2, 7, 8, 9, 10)), 'day')).toBe(false, 'month is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 3, 7, 8, 9, 10)), 'day')).toBe(true, 'day is later');
  expect(m.isBefore(dayjs(new Date(2011, 3, 1, 7, 8, 9, 10)), 'day')).toBe(false, 'day is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 0, 0, 0, 0)), 'day')).toBe(false, 'exact start of day');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 23, 59, 59, 999)), 'day')).toBe(false, 'exact end of day');
  expect(m.isBefore(dayjs(new Date(2011, 3, 3, 0, 0, 0, 0)), 'day')).toBe(true, 'start of next day');
  expect(m.isBefore(dayjs(new Date(2011, 3, 1, 23, 59, 59, 999)), 'day')).toBe(false, 'end of previous day');
  expect(m.isBefore(dayjs(new Date(2010, 3, 10, 0, 0, 0, 0)), 'day')).toBe(false, 'later day but earlier year');
  expect(m.isBefore(m, 'day')).toBe(false, 'same moments are not before the same day');
  expect(+m).toEqual(+mCopy, 'isBefore day should not change moment');
});

test('is before hour', () => {
  const m = dayjs(new Date(2011, 3, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 8, 9, 10)), 'hour')).toBe(false, 'hour match');
  expect(m.isBefore(dayjs(new Date(2012, 3, 2, 3, 8, 9, 10)), 'hours')).toBe(true, 'plural should work');
  expect(m.isBefore(dayjs(new Date(2012, 3, 2, 3, 8, 9, 10)), 'hour')).toBe(true, 'year is later');
  expect(m.isBefore(dayjs(new Date(2010, 3, 2, 3, 8, 9, 10)), 'hour')).toBe(false, 'year is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 4, 2, 3, 8, 9, 10)), 'hour')).toBe(true, 'month is later');
  expect(m.isBefore(dayjs(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hour')).toBe(false, 'month is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 3, 3, 8, 9, 10)), 'hour')).toBe(true, 'day is later');
  expect(m.isBefore(dayjs(new Date(2011, 3, 1, 3, 8, 9, 10)), 'hour')).toBe(false, 'day is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 4, 8, 9, 10)), 'hour')).toBe(true, 'hour is later');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 8, 9, 10)), 'hour')).toBe(false, 'hour is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 0, 0, 0)), 'hour')).toBe(false, 'exact start of hour');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 59, 59, 999)), 'hour')).toBe(false, 'exact end of hour');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 4, 0, 0, 0)), 'hour')).toBe(true, 'start of next hour');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 2, 59, 59, 999)), 'hour')).toBe(false, 'end of previous hour');
  expect(m.isBefore(m, 'hour')).toBe(false, 'same moments are not before the same hour');
  expect(+m).toEqual(+mCopy, 'isBefore hour should not change moment');
});

test('is before minute', () => {
  const m = dayjs(new Date(2011, 3, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 4, 9, 10)), 'minute')).toBe(false, 'minute match');
  expect(m.isBefore(dayjs(new Date(2012, 3, 2, 3, 4, 9, 10)), 'minutes')).toBe(true, 'plural should work');
  expect(m.isBefore(dayjs(new Date(2012, 3, 2, 3, 4, 9, 10)), 'minute')).toBe(true, 'year is later');
  expect(m.isBefore(dayjs(new Date(2010, 3, 2, 3, 4, 9, 10)), 'minute')).toBe(false, 'year is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 4, 2, 3, 4, 9, 10)), 'minute')).toBe(true, 'month is later');
  expect(m.isBefore(dayjs(new Date(2011, 2, 2, 3, 4, 9, 10)), 'minute')).toBe(false, 'month is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 3, 3, 4, 9, 10)), 'minute')).toBe(true, 'day is later');
  expect(m.isBefore(dayjs(new Date(2011, 3, 1, 3, 4, 9, 10)), 'minute')).toBe(false, 'day is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 4, 4, 9, 10)), 'minute')).toBe(true, 'hour is later');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 2, 4, 9, 10)), 'minute')).toBe(false, 'hour is earler');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 5, 9, 10)), 'minute')).toBe(true, 'minute is later');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 3, 9, 10)), 'minute')).toBe(false, 'minute is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 4, 0, 0)), 'minute')).toBe(false, 'exact start of minute');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 4, 59, 999)), 'minute')).toBe(false, 'exact end of minute');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 5, 0, 0)), 'minute')).toBe(true, 'start of next minute');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 3, 59, 999)), 'minute')).toBe(false, 'end of previous minute');
  expect(m.isBefore(m, 'minute')).toBe(false, 'same moments are not before the same minute');
  expect(+m).toEqual(+mCopy, 'isBefore minute should not change moment');
});

test('is before second', () => {
  const m = dayjs(new Date(2011, 3, 2, 3, 4, 5, 10));
  const mCopy = dayjs(m);
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 4, 5, 10)), 'second')).toBe(false, 'second match');
  expect(m.isBefore(dayjs(new Date(2012, 3, 2, 3, 4, 5, 10)), 'seconds')).toBe(true, 'plural should work');
  expect(m.isBefore(dayjs(new Date(2012, 3, 2, 3, 4, 5, 10)), 'second')).toBe(true, 'year is later');
  expect(m.isBefore(dayjs(new Date(2010, 3, 2, 3, 4, 5, 10)), 'second')).toBe(false, 'year is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 4, 2, 3, 4, 5, 10)), 'second')).toBe(true, 'month is later');
  expect(m.isBefore(dayjs(new Date(2011, 2, 2, 3, 4, 5, 10)), 'second')).toBe(false, 'month is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 3, 3, 4, 5, 10)), 'second')).toBe(true, 'day is later');
  expect(m.isBefore(dayjs(new Date(2011, 3, 1, 1, 4, 5, 10)), 'second')).toBe(false, 'day is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 4, 4, 5, 10)), 'second')).toBe(true, 'hour is later');
  expect(m.isBefore(dayjs(new Date(2011, 3, 1, 4, 1, 5, 10)), 'second')).toBe(false, 'hour is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 5, 5, 10)), 'second')).toBe(true, 'minute is later');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 3, 5, 10)), 'second')).toBe(false, 'minute is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 4, 6, 10)), 'second')).toBe(true, 'second is later');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 4, 4, 5)), 'second')).toBe(false, 'second is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 4, 5, 0)), 'second')).toBe(false, 'exact start of second');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 4, 5, 999)), 'second')).toBe(false, 'exact end of second');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 4, 6, 0)), 'second')).toBe(true, 'start of next second');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 4, 4, 999)), 'second')).toBe(false, 'end of previous second');
  expect(m.isBefore(m, 'second')).toBe(false, 'same moments are not before the same second');
  expect(+m).toEqual(+mCopy, 'isBefore second should not change moment');
});

test('is before millisecond', () => {
  const m = dayjs(new Date(2011, 3, 2, 3, 4, 5, 10));
  const mCopy = dayjs(m);
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 4, 5, 10)), 'millisecond')).toBe(false, 'millisecond match');
  expect(m.isBefore(dayjs(new Date(2010, 3, 2, 3, 4, 5, 10)), 'milliseconds')).toBe(false, 'plural should work');
  expect(m.isBefore(dayjs(new Date(2012, 3, 2, 3, 4, 5, 10)), 'millisecond')).toBe(true, 'year is later');
  expect(m.isBefore(dayjs(new Date(2010, 3, 2, 3, 4, 5, 10)), 'millisecond')).toBe(false, 'year is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 4, 2, 3, 4, 5, 10)), 'millisecond')).toBe(true, 'month is later');
  expect(m.isBefore(dayjs(new Date(2011, 2, 2, 3, 4, 5, 10)), 'millisecond')).toBe(false, 'month is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 3, 3, 4, 5, 10)), 'millisecond')).toBe(true, 'day is later');
  expect(m.isBefore(dayjs(new Date(2011, 3, 1, 1, 4, 5, 10)), 'millisecond')).toBe(false, 'day is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 4, 4, 5, 10)), 'millisecond')).toBe(true, 'hour is later');
  expect(m.isBefore(dayjs(new Date(2011, 3, 1, 4, 1, 5, 10)), 'millisecond')).toBe(false, 'hour is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 5, 5, 10)), 'millisecond')).toBe(true, 'minute is later');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 3, 5, 10)), 'millisecond')).toBe(false, 'minute is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 4, 6, 10)), 'millisecond')).toBe(true, 'second is later');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 4, 4, 5)), 'millisecond')).toBe(false, 'second is earlier');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 4, 6, 11)), 'millisecond')).toBe(true, 'millisecond is later');
  expect(m.isBefore(dayjs(new Date(2011, 3, 2, 3, 4, 4, 9)), 'millisecond')).toBe(false, 'millisecond is earlier');
  expect(m.isBefore(m, 'millisecond')).toBe(false, 'same moments are not before the same millisecond');
  expect(+m).toEqual(+mCopy, 'isBefore millisecond should not change moment');
});

test('is before invalid', () => {
  const m = dayjs();
  const invalid = dayjs(null);
  expect(m.isBefore(invalid)).toBe(false, 'valid moment is not before invalid moment');
  expect(invalid.isBefore(m)).toBe(false, 'invalid moment is not before valid moment');
  expect(m.isBefore(invalid, 'year')).toBe(false, 'invalid moment year');
  expect(m.isBefore(invalid, 'month')).toBe(false, 'invalid moment month');
  expect(m.isBefore(invalid, 'day')).toBe(false, 'invalid moment day');
  expect(m.isBefore(invalid, 'hour')).toBe(false, 'invalid moment hour');
  expect(m.isBefore(invalid, 'minute')).toBe(false, 'invalid moment minute');
  expect(m.isBefore(invalid, 'second')).toBe(false, 'invalid moment second');
  expect(m.isBefore(invalid, 'milliseconds')).toBe(false, 'invalid moment milliseconds');
});
