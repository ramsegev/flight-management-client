import React, {FC, useCallback, useEffect, useRef} from 'react';
import {observer} from 'mobx-react';
import {useFlightDetails} from "../../hooks/useFlightDetails";
import {IFlight} from "../../../types/types";
import './filghtStyle.scss';

const Flight: FC<IFlight> = ({
                                       flightNumber,
                                       status,
                                       takeoffTime,
                                       landingTime,
                                       takeoffAirport,
                                       landingAirport,
                                       flightClass,
                                       delayHours,
                                   }) => {
    const previousFlightDataRef = useRef<Partial<IFlight>>({}); // Store previous values for comparison
    const {flightClasses, classNames, delayDisplay} = useFlightDetails(flightClass, delayHours);
    const renderChangedFields = useCallback((fields: string[]) => {
        return fields.map((field) => <div key={flightNumber + field} className={`flight-cell`}>
            {field === "flightNumber" && <span>{flightNumber}</span>}
            {field === "status" && <span className={flightClasses.statusClass}>{status}</span>}
            {field === "takeoffTime" && <span className={flightClasses.takeoffTimeClass}>{takeoffTime}</span>}
            {field === "landingTime" && <span className={flightClasses.landingTimeClass}>{landingTime}</span>}
            {field === "takeoffAirport" && <span>{takeoffAirport}</span>}
            {field === "landingAirport" &&
                <span className={flightClasses.landingAirportClass}>{landingAirport}</span>}
            {field === "delayHours" && <span className={flightClasses.delayHoursClass}>{delayDisplay}</span>}
        </div>);
    }, [flightNumber, status, takeoffTime, landingTime, takeoffAirport, landingAirport, delayDisplay, flightClasses]);

    useEffect(() => {
        // Identify changed fields:
        const changedFields = [];
        if (previousFlightDataRef.current.status !== status) changedFields.push("status");
        if (previousFlightDataRef.current.takeoffTime !== takeoffTime) changedFields.push("takeoffTime");
        if (previousFlightDataRef.current.landingTime !== landingTime) changedFields.push("landingTime");
        if (previousFlightDataRef.current.landingAirport !== landingAirport) changedFields.push("landingAirport");
        if (previousFlightDataRef.current.delayHours !== delayHours) changedFields.push("delayHours");

        // Update previous flight data:
        previousFlightDataRef.current = {
            status,
            takeoffTime,
            landingTime,
            landingAirport,
            delayHours,
        };
        // Render only changed fields:
        renderChangedFields(changedFields);
    }, [status, takeoffTime, landingTime, landingAirport, delayHours, renderChangedFields]);


    return <div className={classNames}>
        {renderChangedFields(["flightNumber", "status", "takeoffTime", "landingTime", "takeoffAirport", "landingAirport", "delayHours"])}
    </div>;
};

export default observer(Flight);