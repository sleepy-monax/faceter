function toHumanTime(date) {
    let delta = Math.round((+new Date - new Date(date)) / 1000);

    let minute = 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;

    let fuzzy = date;

    if (delta < 30) {
        fuzzy = 'Maintenant.';
    } else if (delta < minute) {
        fuzzy = 'Il y a ' + delta + ' secondes.';
    } else if (delta < 2 * minute) {
        fuzzy = 'Il y a une minute.'
    } else if (delta < hour) {
        fuzzy = 'Il y a ' + Math.floor(delta / minute) + ' minutes.'
    } else if (Math.floor(delta / hour) == 1) {
        fuzzy = 'Il y a une heure.'
    } else if (delta < day) {
        fuzzy = 'Il y a ' + Math.floor(delta / hour) + ' heures.'
    } else if (delta < day * 2) {
        fuzzy = 'Hier.';
    }

    return fuzzy;
}

export { toHumanTime };