import React from 'react';
import {observer} from 'mobx-react';
import {IFlight} from "../../types/types";


const Flight: React.FC<IFlight> = (({
                                        flightNumber,
                                        status,
                                        takeoffTime,
                                        landingTime,
                                        takeoffAirport
                                    }) => {

    return (
        <tr>
            <td>{flightNumber}</td>
            <td>{status}</td>
            <td>{takeoffTime}</td>
            <td>{landingTime}</td>
            <td>{takeoffAirport}</td>
        </tr>
    );
});

export default observer(Flight);
