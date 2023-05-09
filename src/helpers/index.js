export const formatDate = (strDate) => {
    const date = new Date(strDate);
    return `${date.toLocaleString("default", {month: "long", year: "numeric"})}`;
}