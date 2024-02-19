import React from 'react';
import FlightsList from "../../components/FlighstList/FlightsList";
import Filters from "../../components/Filters";

const FlightsMonitor: React.FC = (() => {
    return (
        <>
            <Filters/>
            <FlightsList/>
        </>
    );
});

export default FlightsMonitor;
