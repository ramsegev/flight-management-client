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
                                    }) => {
    const socketStore = useContext(SocketStoreContext);
    const {flightClasses} = socketStore;
    return (
    <div className={`flight-row ${status}`} key={flightNumber}>
        <div className="flight-cell">{flightNumber}</div>
        <div key={flightNumber+status} className={`flight-cell ${flightClasses.statusClass}`}>{status}</div>
        <div key={flightNumber+takeoffTime} className={`flight-cell ${flightClasses.takeoffTimeClass}`}>{takeoffTime}</div>
        <div key={flightNumber+landingTime} className={`flight-cell ${flightClasses.landingTimeClass}`}>{landingTime}</div>
        <div key={flightNumber+takeoffAirport} className={`flight-cell ${flightClasses.takeoffAirportClass}`}>{takeoffAirport}</div>
    </div>
    );
});

export default observer(Flight);
