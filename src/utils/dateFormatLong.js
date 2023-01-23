const dateFormatLong = (date) => {
    const newDate = new Date(date);
    const options = {
        dateStyle: "long",
    };
    return new Intl.DateTimeFormat("es-ES", options).format(newDate);
};

export default dateFormatLong;