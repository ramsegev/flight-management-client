import React, {FC, lazy, Suspense, useEffect} from 'react';
import flightsStore from "../../stores/FlightsStore"
import Filters from "../../components/Filters";
import './flightsMonitorStyle.scss';

const FlightsList = lazy(() => import("../../components/FlightsList"));
const FlightsMonitor: FC = () => {
    useEffect(() => {
        flightsStore.connect();
    }, []);
    return <div className="flightsMonitor">
        <header className="header-wrapper">
            <h1>Flight Manager</h1>
            <Filters/>
        </header>
        <main className="flight-list-container">
            <Suspense fallback={<div>Loading flights...</div>}>
                <FlightsList/>
            </Suspense>
        </main>
    </div>;
};

export default FlightsMonitor;
