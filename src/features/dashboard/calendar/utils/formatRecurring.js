import { RRule } from "rrule";

const weekdays = {
    0: "lunes",
    1: "martes",
    2: "miércoles",
    3: "jueves",
    4: "viernes",
    5: "sábado",
    6: "domingo",
};

const formatRecurring = (recurringDef) => {
    const rule = RRule.fromString(recurringDef.typeData.rruleSet.toString());

    if (rule.options.freq === 0 && rule.options.interval === 1) {
        return "Cada año";
    }

    if (rule.options.freq === 0 && rule.options.interval > 1) {
        return "Cada " + rule.options.interval + " años";
    }

    if (rule.options.freq === 1 && rule.options.interval === 1) {
        return "Cada mes el día " + rule.options.bymonthday[0];
    }

    if (rule.options.freq === 1 && rule.options.interval > 1) {
        return "Cada " + rule.options.interval + " meses el día " + rule.options.bymonthday[0];
    }

    if (rule.options.freq === 2 && rule.options.interval === 1) {
        return "Cada semana el " + weekdays[rule.options.byweekday[0]];
    }

    if (rule.options.freq === 2 && rule.options.interval > 1) {
        return (
            "Cada " + rule.options.interval + " semanas el " + weekdays[rule.options.byweekday[0]]
        );
    }

    if (rule.options.freq === 3 && rule.options.interval === 1) {
        return "Cada día";
    }

    if (rule.options.freq === 3 && rule.options.interval > 1) {
        return "Cada " + rule.options.interval + " días";
    }
};

export default formatRecurring;
