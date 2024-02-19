import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react';
import {SocketStoreContext} from "../../stores/socketStore";
import Flight from "../../components/Flight";
import {IFlight} from "../../../types/types";


const FlightsList: React.FC = (() => {
    const socketStore = useContext(SocketStoreContext);
    const {filteredFlights} = socketStore;
    useEffect(() => {
        console.log(socketStore.isConnected)
        !socketStore.isConnected && socketStore.connect();
    }, [socketStore]);
    const handleCloseConnection = () => {
        socketStore.disconnect();
    }
    return (
        <>
            <button onClick={handleCloseConnection}>Close connection</button>
            <div className="flight-table">
                <div className="flight-row flight-header">
                    <div className="flight-cell">Flight Number</div>
                    <div className="flight-cell">Status</div>
                    <div className="flight-cell">Takeoff Time</div>
                    <div className="flight-cell">Landing Time</div>
                    <div className="flight-cell">Takeoff Airport</div>
                </div>
                <div className="flight-body">
                    {filteredFlights.map((flight: IFlight) => (
                        <Flight key={flight.flightNumber} {...flight} />
                    ))}
                </div>
            </div>
        </>
    );
});

export default observer(FlightsList);
