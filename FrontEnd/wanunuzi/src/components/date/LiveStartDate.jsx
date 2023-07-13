import React, { useEffect, useState } from "react";
import moment from "moment";

const LiveStartDate = ({ date }) => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = moment();
            const then = moment(date);
            const duration = moment.duration(now.diff(then));  // Subtract start date from the current date
            const days = duration.asDays();
            const weeks = duration.asWeeks();
            const months = duration.asMonths();

            if (months >= 1) {
                setTime(`${Math.floor(months)}m ${duration.days()}d ${duration.hours()}h`);
            } else if (weeks >= 1) {
                setTime(`${Math.floor(weeks)}w ${duration.days()}d ${duration.hours()}h`);
            } else if (days >= 1) {
                setTime(`${Math.floor(days)}d ${duration.hours()}h ${duration.minutes()}m`);
            } else {
                setTime(`${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`);
            }
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, [date]);

    return <span>{time}</span>;
};

export default LiveStartDate;