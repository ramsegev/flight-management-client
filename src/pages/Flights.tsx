import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react';
import {SocketStoreContext} from "../stores/socketStore";
import Flight from "../components/Flight";
import {IFlight} from "../../types/types";


const Flights: React.FC = (() => {
    const socketStore = useContext(SocketStoreContext);
    const {messages} = socketStore;
    useEffect(() => {
        !socketStore.isConnected && socketStore.connect();
    }, [socketStore]);
    const handleCloseConnection = () => {
        socketStore.disconnect();
    }
    return (
        <>
            <button onClick={handleCloseConnection}>Close connection</button>
            <table>
                <thead>
                <tr>
                    <th>'Flight Number'</th>
                    <th>'Status'</th>
                    <th>'Takeoff Time'</th>
                    <th>'Landing Time'</th>
                    <th>'Takeoff Airport'</th>
                </tr>
                </thead>
                <tbody>
                {messages.map((msg: IFlight, index) => (
                    <Flight key={msg.flightNumber + index} {...msg} />
                ))}
                </tbody>
            </table>
        </>
    );
});

export default observer(Flights);
