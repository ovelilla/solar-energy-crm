const currencyFormat = (amount) => {
    const options = {
        style: "currency",
        currency: "EUR",
        useGrouping: true,
        minimumFractionDigits: 2,
    };

    return new Intl.NumberFormat("es-ES", options).format(amount);
};

export default currencyFormat;