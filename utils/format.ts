/**
 * Formats an integer with Indian digit grouping (e.g. 2,50,000), matching the
 * approved counter behaviour on the home stats.
 */
export function formatIndianNumber(value: number): string {
  return Math.round(value).toLocaleString("en-IN");
}
