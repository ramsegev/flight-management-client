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
    }
    @action
    setSearchQuery(query: string = "") {
        this.searchQuery = query;
    }
    @computed
    get filteredFlights() {
        const query = this.searchQuery.toLowerCase();
        return this.flights.filter(flight => {
                return flight.flightNumber.toLowerCase().includes(query) ||
                flight.takeoffAirport.toLowerCase().includes(query) ||
                flight.landingAirport.toLowerCase().includes(query)
            }
        );

    }
    setConnected(){
        this.isConnected = true;
    }
    addFlight(flight: IFlight) {
        const delayHours = this.timeDifferenceInMinutes(flight.takeoffTime, flight.landingTime);
        const flightClass = flight.status === 'malfunction' ? 'malfunction' :
            delayHours >= 120 ? 'longDelay' : '';
        const updatedFlight = {...flight};
        updatedFlight.flightClass = flightClass;
        console.log('delayHours', delayHours)
        updatedFlight.delayHours = isNaN(delayHours) || delayHours <= 0 ? 'On Time' : `${Math.floor(delayHours/60) }\\h`
        const flightIndex = this.flights.findIndex(
            (flightData) => flightData.flightNumber === updatedFlight.flightNumber
        );

        if (flightIndex !== -1) {
            Object.assign(this.flights[flightIndex], updatedFlight);
            this.updateFlightClasses(updatedFlight, this.flights[flightIndex]);
        } else {
            this.flights.push(updatedFlight);
        }
    }
    updateFlightClasses(newFlight: IFlight, oldFlight: IFlight) {
        const classes: (keyof IFlightClasses)[] = [
            "statusClass",
            "takeoffTimeClass",
            "landingTimeClass",
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

    timeDifferenceInMinutes(time1: string, time2: string) {
        // Parse the time strings into Date objects
        const date1 = new Date(time1.replace(/-/g, '/'));
        const date2 = new Date(time2.replace(/-/g, '/'));

        // Calculate the difference in milliseconds
        const diffInMs = date2.getTime() - date1.getTime();

        // Convert milliseconds to minutes and round down
        return Math.floor(diffInMs / 1000 / 60);
    }
}

const websocketStore = new SocketIoStore();
export const SocketStoreContext = createContext(websocketStore);
