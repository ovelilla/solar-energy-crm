import capitalizeFirstLetter from "@utils/capitalizeFirstLetter";

const formatDate = (start, end, allDay) => {
    if (allDay && end.getDate() - start.getDate() === 1) {
        return capitalizeFirstLetter(
            start.toLocaleDateString("es-ES", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            })
        );
    }

    if (allDay && end.getDate() - start.getDate() > 1) {
        return capitalizeFirstLetter(
            `${start.getDate()} - ${end.getDate() - 1} de ${start.toLocaleDateString("es-ES", {
                month: "long",
                year: "numeric",
            })}`
        );
    }

    if (!allDay && start.getDate() === end.getDate()) {
        return capitalizeFirstLetter(
            `${start.toLocaleDateString("es-ES", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            })}, ${start.toLocaleTimeString("es-ES", {
                hour: "numeric",
                minute: "numeric",
            })} - ${end.toLocaleTimeString("es-ES", {
                hour: "numeric",
                minute: "numeric",
            })}`
        );
    }

    if (!allDay && start.getDate() !== end.getDate()) {
        return capitalizeFirstLetter(
            `${start.toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
            })}, ${start.toLocaleTimeString("es-ES", {
                hour: "numeric",
                minute: "numeric",
            })} - ${end.toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
            })}, ${end.toLocaleTimeString("es-ES", {
                hour: "numeric",
                minute: "numeric",
            })}`
        );
    }
};

export default formatDate;
