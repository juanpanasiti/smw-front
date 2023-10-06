export const getColorForChart = (amount: number, limit: number): string => {
    const colors = ['#FF0000', '#FF5733', '#FFC300', '#DAF7A6', '#A9DFBF'];
    if (amount > limit) {
        return colors[0];
    } else if (amount > (limit*0.75)) {
        return colors[1];
    } else if (amount > (limit*0.5)) {
        return colors[2];
    } else if (amount > (limit*0.25)) {
        return colors[3];
    } else {
        return colors[4];
    }
};
