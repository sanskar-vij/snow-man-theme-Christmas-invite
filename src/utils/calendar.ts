export function downloadChristmasCalendarEvent() {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Christmas Party Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:christmas-party-2026-grand-hall@yourmail.com',
    'DTSTAMP:20261201T120000Z',
    'DTSTART:20261220T190000',
    'DTEND:20261220T220000',
    'SUMMARY:Christmas Party at The Grand Hall',
    'DESCRIPTION:Join us to celebrate the season of joy, love and togetherness! RSVP by December 15, 2026 at +1 (555) 123-4567 or party@yourmail.com.',
    'LOCATION:The Grand Hall, 123 Celebration Way, New York',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Christmas-Party-2026.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
