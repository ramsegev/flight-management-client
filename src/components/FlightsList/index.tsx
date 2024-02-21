import React, {FC, useEffect, useRef} from 'react';
import {observer} from 'mobx-react';
import flightsStore from "../../stores/FlightsStore";
import Flight from "../../components/Flight";
import {IFlight} from "../../../types/types";
import './flightsListStyle.scss';

const FlightsList: FC = () => {
    const {filteredFlights} = flightsStore;
    const previousFlightsRef = useRef<IFlight[]>([]);

    useEffect(() => {
        // Identify changed flights:
        const changedFlights = filteredFlights.filter((flight: IFlight, index: number) => {
            return !previousFlightsRef.current[index] || JSON.stringify(flight) !== JSON.stringify(previousFlightsRef.current[index]);
        });

        // Update previous flights reference:
        previousFlightsRef.current = filteredFlights;

        // Render only changed flights:
        renderChangedFlights(changedFlights);
    }, [filteredFlights]);

    const renderChangedFlights = (flights: IFlight[]) => {
        // Implement your rendering logic here, e.g.:
        return flights.map((flight: IFlight) => <Flight key={flight.flightNumber} {...flight} />);
    };

    return <div className="flight-table">
        <div className="flight-row flight-header">
            <div className="flight-cell">Flight Number</div>
            <div className="flight-cell">Status</div>
            <div className="flight-cell">Takeoff Time</div>
            <div className="flight-cell">Landing Time</div>
            <div className="flight-cell">Takeoff Airport</div>
            <div className="flight-cell">Landing Airport</div>
            <div className="flight-cell">Delay</div>
        </div>
        <div className="flight-body">
            {renderChangedFlights(filteredFlights)}
        </div>
    </div>;
};

export default observer(FlightsList);


