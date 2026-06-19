import { differenceInYears } from 'date-fns';
export function calcAge(date1: Date, date2: DateOrStringOrNumber): number {
  return differenceInYears(date1, date2);
}
