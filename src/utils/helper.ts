export function formatDate(date: string | Date, type = 'en-US'): string {
    return new Date(date).toLocaleDateString(type, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}