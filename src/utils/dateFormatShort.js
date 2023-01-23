const dateFormatShort = (date) => {
    const newDate = new Date(date);
    const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    };
    return new Intl.DateTimeFormat("es-ES", options).format(newDate);
};

export default dateFormatShort;