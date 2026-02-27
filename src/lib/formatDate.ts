import dayjs from 'dayjs';

/**
 * Formats a date stored as YYYY-MM (ISO month) or the literal "present"
 * into a human-readable string: "Dec 2024" or "Present".
 *
 * spec://cv/data#schema
 */
export function formatDate(value: string): string {
  if (value === 'present') return 'Present';
  return dayjs(value).format('MMM YYYY');
}
