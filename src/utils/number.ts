export const numberWithCommas = (x: string | number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getNumberLabel = (label: number) => {
    const labelValue = Number(label.toFixed(2));
    // Nine Zeroes for Billions
    return numberWithCommas(
        Math.abs(labelValue) >= 1.0e9
            ? Math.round(Math.abs(labelValue) / 1.0e9) + 'B'
            : // Six Zeroes for Millions
            Math.abs(labelValue) >= 1.0e6
            ? Math.round(Math.abs(labelValue) / 1.0e6) + 'M'
            : Math.abs(labelValue)
    );
};
