import './card.css'
function getCurrentDate(): string[] {
    const currentDate = new Date();
    const date = currentDate.getDate();
    const day = currentDate.getDay();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const daysOfWeek = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    const monthsOfYear = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const today = daysOfWeek[day];
    const currentMonth = monthsOfYear[month - 1];
    return [date.toString(), today, currentMonth, year.toString()];
}

export default function DayAndDate() {
    const [day, today, month, year] = getCurrentDate();

    return (
        <div className='DayAndMonthAndYearAndCDay'>
            <div className='DayAndMonthAndYear'>
                    <div className='day'>{day}</div>
                <div className='DayAndMonth'>
                    <div className='month'>{month}</div>
                <div className='year'>{year}</div>
                </div>
            </div>
            <div className='today'>{today}</div>
        </div>
    );
}
