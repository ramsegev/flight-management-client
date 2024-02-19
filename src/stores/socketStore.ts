import {createContext} from "react";
import socketIOClient from "socket.io-client";
import {action, computed, makeAutoObservable, observable} from "mobx";
import {IFlight, IFlightClasses} from "../../types/types";

class SocketIoStore {
    ws = socketIOClient("http://localhost:4963/", {
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
    @observable isConnected: boolean = false;
    searchQuery: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    @action
    connect() {
        this.ws.on("flight-update", this.handleFlightUpdate);
        this.ws.on("connected", this.setConnected);
    }
    @action
    disconnect() {
        this.ws.disconnect();
        this.isConnected = false;
        console.log("Connection closed");
    }
    @action
    setSearchQuery(query: string = "") {
        this.searchQuery = query;
    }
    @computed
    get filteredFlights() {
        const query = this.searchQuery.toLowerCase();
        return this.flights.filter(flight =>
            flight.flightNumber.toLowerCase().includes(query) ||
            flight.takeoffAirport.toLowerCase().includes(query) ||
            flight.landingAirport.toLowerCase().includes(query)
        );
    }
    setConnected = () => {
        this.isConnected = true;
    };
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
    handleFlightUpdate = (data: IFlight) => {
        this.addFlight(data);
    };
}

const websocketStore = new SocketIoStore();
export const SocketStoreContext = createContext(websocketStore);
