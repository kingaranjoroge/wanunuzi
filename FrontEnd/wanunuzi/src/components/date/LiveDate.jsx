import React, { useEffect, useState } from "react";
import moment from "moment";

const LiveDate = ({ date }) => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = moment();
            const then = moment(date);
            const duration = moment.duration(now.diff(then));
            const days = Math.floor(duration.asDays());
            const hours = duration.hours();
            const minutes = duration.minutes();
            const seconds = duration.seconds();
            setTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, [date]);

    return <span>{time}</span>;
};

export default LiveDate;
