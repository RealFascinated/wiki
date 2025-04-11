/**
 * Capitalize the first letter of
 * each word in the given string.
 *
 * @param str the string to capitalize
 * @return the capitalized string
 */
export const capitalizeWords = (str: string | undefined): string | undefined =>
  str &&
  str.toLowerCase().replace(/\b\w/g, (char: string) => char.toUpperCase());

export const truncateText = (
  text: string | undefined,
  maxLength: number
): string | undefined =>
  text && text.length > maxLength
    ? text.slice(0, maxLength - 3).trim() + "..."
    : text;
