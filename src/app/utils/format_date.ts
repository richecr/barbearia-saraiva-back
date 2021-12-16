const months = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO',
    'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'];

export function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function getMonth(date: Date) {
    const month = months[date.getUTCMonth()].substring(0, 3);
    return capitalize(month.toLowerCase());
}
