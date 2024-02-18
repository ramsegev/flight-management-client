import {createContext} from "react";
import socketIOClient, {io} from "socket.io-client";
import {action, makeAutoObservable, observable} from "mobx";
import {IFlight} from "../../types/types";

class SocketIoStore {
    io = io();
    @observable flights: IFlight[] = [];
    @observable isConnected: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    connect() {
        this.io = socketIOClient("http://localhost:4963/", {
            transports: ["websocket"],
        });
        this.io.on("flight-update", (data) => {
            this.addFlight(data);
        });
        this.io.on("connected", () => {
            this.isConnected = true;
        });

    }
    @action
    addFlight(flight: IFlight) {
        const flightIndex = this.flights.findIndex(flightData => flightData.flightNumber === flight.flightNumber);
        if (flightIndex !== -1) {
            Object.assign(this.flights[flightIndex], flight);
        } else {
            this.flights.push(flight);
        }
    }

    disconnect() {
        this.io.disconnect();
        console.log("connection closed")
    }
}

const websocketStore = new SocketIoStore();
export const SocketStoreContext = createContext(websocketStore);
