/**
 * Formats a date string to a more readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

/**
 * Formats a time string to a more readable format
 */
export function formatTime(timeString: string): string {
  const date = new Date(timeString)
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date)
}

/**
 * Formats a date and time string to a more readable format
 */
export function formatDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date)
}
