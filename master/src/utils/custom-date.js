import moment from "moment";

export function convertToMinutes(time) {
    const momentTime = moment(time, "HH:mm");
    return momentTime.hours() * 60 + momentTime.minutes();
}

export function convertToMinutesAlt(time) {
    return moment.utc(time * 60 * 1000).format("HH:mm");
}