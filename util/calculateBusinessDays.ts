export default function(from_date: Date, offset: number) : Date {
    let i = 0;
    const date = new Date();
    while(i < offset) {
        date.setDate(date.getDate() + 1);
        const dayOfWeek = date.getDay();
        const isBusinessDay = dayOfWeek !== 0 && dayOfWeek !== 6;
        if ( isBusinessDay ) {
            i++;
        }
    }
    return date;
}