export const formatDate = (value:string, is_datetime=false) => {
    if (value) {
        const format = is_datetime ? {
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        } : {
            year: "numeric",
            month: "long",
            day: "numeric"
        }

        return new Intl.DateTimeFormat("ru", format).format(Date.parse(value)).replace("в ", "");
    }
}