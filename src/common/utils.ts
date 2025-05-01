/**
 * Formats a time difference into a human-readable string
 * @param diff - The time difference in seconds or milliseconds
 * @param showMilliseconds - Whether to show milliseconds or convert to seconds
 * @returns A formatted string like "2 days", "3 hours", "5 minutes", or "10 seconds"
 */
export function formatRelativeTime(diff: number, showMilliseconds: boolean): string {
  if (showMilliseconds) {
    if (diff < 1000) return `${diff}ms`;
    diff = Math.floor(diff / 1000);
  }

  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  return `${diff} second${diff !== 1 ? 's' : ''}`;
}

/**
 * Gets the current Unix timestamp
 * @param showMilliseconds - Whether to return milliseconds (true) or seconds (false)
 * @returns Current timestamp in seconds or milliseconds
 */
export function getCurrentTimestamp(showMilliseconds: boolean): number {
  const now = Date.now();
  return showMilliseconds ? now : Math.floor(now / 1000);
}

/**
 * Converts a Unix timestamp to a Date object
 * @param timestamp - The Unix timestamp to convert
 * @param showMilliseconds - Whether the timestamp is in milliseconds (true) or seconds (false)
 * @returns A Date object representing the timestamp
 */
export function convertTimestampToDate(timestamp: number, showMilliseconds: boolean): Date {
  return new Date(showMilliseconds ? timestamp : timestamp * 1000);
}

/**
 * Converts a Date object to a Unix timestamp
 * @param date - The Date object to convert
 * @param showMilliseconds - Whether to return milliseconds (true) or seconds (false)
 * @returns Unix timestamp in seconds or milliseconds
 */
export function convertDateToTimestamp(date: Date, showMilliseconds: boolean): number {
  return showMilliseconds ? date.getTime() : Math.floor(date.getTime() / 1000);
}

/**
 * Converts a timestamp between seconds and milliseconds
 * @param timestamp - The timestamp to convert
 * @param fromMilliseconds - Whether the input timestamp is in milliseconds (true) or seconds (false)
 * @param toMilliseconds - Whether to convert to milliseconds (true) or seconds (false)
 * @returns Converted timestamp in the requested unit
 */
export function convertTimestampUnits(
  timestamp: number,
  fromMilliseconds: boolean,
  toMilliseconds: boolean
): number {
  if (fromMilliseconds === toMilliseconds) return timestamp;
  return toMilliseconds ? timestamp * 1000 : Math.floor(timestamp / 1000);
} 