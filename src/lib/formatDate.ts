/**
 * Formats a date stored as YYYY-MM (ISO month) or the literal "present"
 * into a human-readable string: "Dec 2024" or "Present".
 *
 * spec://cv/data#schema
 */
const fmt = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' });

export function formatDate(value: string): string {
  if (value === 'present') return 'Present';
  return fmt.format(new Date(`${value}-01`));
}
