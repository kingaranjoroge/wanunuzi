import React, { useEffect, useState } from "react";
import moment from "moment";

const LiveDueDate = ({ date }) => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = moment();
            const then = moment(date);
            const duration = moment.duration(then.diff(now));  // Subtract current date from the due date
            const days = duration.asDays();
            const weeks = duration.asWeeks();
            const months = duration.asMonths();

            if (duration <= 0) {
                setTime("Due date passed");
            } else if (months >= 1) {
                setTime(`${Math.floor(months)}months ${duration.days()}d ${duration.hours()}hrs`);
            } else if (weeks >= 1) {
                setTime(`${Math.floor(weeks)}weeks ${duration.days()}d ${duration.hours()}hrs`);
            } else if (days >= 1) {
                setTime(`${Math.floor(days)}d ${duration.hours()}hrs ${duration.minutes()}min`);
            } else {
                setTime(`${duration.hours()}h ${duration.minutes()}min ${duration.seconds()}sec`);
            }
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, [date]);

    return <span>{time}</span>;
};

export default LiveDueDate;
