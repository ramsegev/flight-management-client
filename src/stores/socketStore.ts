import { createContext } from "react";
import socketIOClient from "socket.io-client";
import { action, makeAutoObservable, observable } from "mobx";
import {IFlight, IFlightClasses} from "../../types/types";

class SocketIoStore {
    io = socketIOClient("http://localhost:4963/", {
        transports: ["websocket"],
    });
    @observable flights: IFlight[] = [];
    @observable flightClasses: IFlightClasses = {
        statusClass: "",
        takeoffTimeClass: "",
        landingTimeClass: "",
        takeoffAirportClass: "",
        landingAirportClass: "",
    };
    @observable isConnected = false;

    constructor() {
        makeAutoObservable(this);
        this.connect();
    }

    connect() {
        this.io.on("flight-update", this.handleFlightUpdate);
        this.io.on("connected", this.handleConnected);
    }

    @action
    addFlight(flight: IFlight) {
        const flightIndex = this.flights.findIndex(
            (flightData) => flightData.flightNumber === flight.flightNumber
        );
        if (flightIndex !== -1) {
            Object.assign(this.flights[flightIndex], flight);
            this.updateFlightClasses(flight, this.flights[flightIndex]);
        } else {
            this.flights.push(flight);
        }
    }

    @action
    handleFlightUpdate = (data: IFlight) => {
        this.addFlight(data);
    };

    @action
    handleConnected = () => {
        this.isConnected = true;
    };

    updateFlightClasses(newFlight: IFlight, oldFlight: IFlight) {
        const classes: (keyof IFlightClasses)[] = [
            "statusClass",
            "takeoffTimeClass",
            "landingTimeClass",
            "takeoffAirportClass",
            "landingAirportClass",
        ];

        classes.forEach((prop) => {
            if ((newFlight as any)[prop] === (oldFlight as any)[prop]) {
                this.flightClasses[prop] = "flight-details-update";
            }
        });
    }

    disconnect() {
        this.io.disconnect();
        console.log("Connection closed");
    }
}

const websocketStore = new SocketIoStore();
export const SocketStoreContext = createContext(websocketStore);
