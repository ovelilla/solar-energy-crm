const getTitleFormat = ({ date }) => {
    const viewYear = date.year;
    const currentYear = new Date().getFullYear();

    const textMonth =
        date.marker.toLocaleString("es-ES", {
            month: viewYear === currentYear ? "long" : "short",
        }) + (viewYear === currentYear ? "" : ".");
    const textYear = viewYear === currentYear ? "" : ` ${viewYear}`;

    return `${textMonth}${textYear}`;
};

export default getTitleFormat;
