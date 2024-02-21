import {useMemo} from "react";
import flightsStore from "../stores/FlightsStore";

export const useFlightDetails = (flightClass: string, delayHours: number) => {
    const flightClasses = useMemo(() => flightsStore.flightClasses, []);
    const flightRowClasses = useMemo(() => {
        return ({
            'flight-row': true,
            [flightClass]: true,
        });
    }, [flightClass]);
    const classNames = Object.keys(flightRowClasses).join(' ');
    const delayDisplay = useMemo(() =>
        flightClass === 'malfunction' ?
            '----' : isNaN(delayHours) || delayHours <= 0 ? 'On Time' : `${Math.ceil(delayHours / 60)} Hours`, [flightClass, delayHours]);
    return (
        {
            classNames,
            delayDisplay,
            flightClasses
        }
    )
}
