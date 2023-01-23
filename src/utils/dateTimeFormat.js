export const dateTimeFormat = (date) => {
    const newDate = new Date(date);
    const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    return new Intl.DateTimeFormat("es-ES", options).format(newDate);
};

export default dateTimeFormat;