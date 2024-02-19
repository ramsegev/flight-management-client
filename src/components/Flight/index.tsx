import React, {useContext} from 'react';
import {observer} from 'mobx-react';
import {IFlight} from "../../../types/types";
import {SocketStoreContext} from "../../stores/socketStore";
import './filghtStyle.scss';

const Flight: React.FC<IFlight> = (({
                                        flightNumber,
                                        status,
                                        takeoffTime,
                                        landingTime,
                                        takeoffAirport,
                                        landingAirport,
                                        flightClass,
                                        delayHours,

                                    }) => {
    const socketStore = useContext(SocketStoreContext);
    const {flightClasses} = socketStore;
    return (
        <div className={`flight-row ${flightClass}`}>
            <div className="flight-cell">{flightNumber}</div>
            <div key={flightNumber + status} className={`flight-cell ${flightClasses.statusClass}`}>{status}</div>
            <div key={flightNumber + takeoffTime}
                 className={`flight-cell ${flightClasses.takeoffTimeClass}`}>{takeoffTime}</div>
            <div key={flightNumber + landingTime}
                 className={`flight-cell ${flightClasses.landingTimeClass}`}>{landingTime}</div>
            <div key={takeoffAirport} className={`flight-cell`}>{takeoffAirport}</div>
            <div key={flightNumber + landingAirport}
                 className={`flight-cell ${flightClasses.landingAirportClass}`}>{landingAirport}</div>
            <div key={flightNumber + delayHours}
                 className={`flight-cell ${flightClasses.landingAirportClass}`}>{delayHours}</div>
        </div>
    );
});

export default observer(Flight);
