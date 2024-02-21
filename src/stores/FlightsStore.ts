import socketIOClient from "socket.io-client";
import {action, computed, makeAutoObservable} from "mobx";
import {IFlight, IFlightClasses} from "../../types/types";
import memoizeOne from 'memoize-one';

class FlightsStore {
    ws = socketIOClient("http://localhost:4963/", {
        transports: ["websocket"],
    });
    flights: IFlight[] = [];
    flightClasses: IFlightClasses = {
        statusClass: "",
        takeoffTimeClass: "",
        landingTimeClass: "",
        landingAirportClass: "",
        delayHoursClass: "",
    };
    searchQuery: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    @action
    connect() {
        this.ws.on("flight-update", this.handleFlightUpdate);
    }

    handleFlightUpdate = (data: IFlight) => {
        this.addFlight(data);
    };

    @action
    setSearchQuery(query: string = "") {
        this.searchQuery = query;
    }

    get filteredFlights() {
        const query = this.searchQuery.toLowerCase();
        return this.flights.filter(flight => {
                return flight.flightNumber.toLowerCase().includes(query) ||
                    flight.takeoffAirport.toLowerCase().includes(query) ||
                    flight.landingAirport.toLowerCase().includes(query)
            }
        );

    }

    @computed
    get timeDifferenceInMinutes() {
        return memoizeOne((time1: string, time2: string) => {
            const date1 = new Date(time1.replace(/-/g, '/'));
            const date2 = new Date(time2.replace(/-/g, '/'));
            return Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 60));
        });
    }

    addFlight(flight: IFlight) {
        const oldFlightIndex = this.flights.findIndex(f => f.flightNumber === flight.flightNumber);
        const isUpdate = oldFlightIndex !== -1;
        let delayHours, flightClass;
        if (isUpdate) {
            const oldFlight = this.flights[oldFlightIndex];
            if (
                oldFlight.delayHours !== flight.delayHours ||
                oldFlight.flightClass !== flight.flightClass

            ) {
                delayHours = this.timeDifferenceInMinutes(flight.takeoffTime, flight.landingTime);
                flightClass = flight.status === 'malfunction' ? 'malfunction' :
                    delayHours >= 120 ? 'longDelay' : '';
            } else {
                delayHours = this.flights[oldFlightIndex].delayHours;
                flightClass = this.flights[oldFlightIndex].flightClass;

            }
            const updatedFlight: IFlight = {...flight, delayHours, flightClass};
            this.flights[oldFlightIndex] = updatedFlight;
            this.updateFlightClasses(updatedFlight, flight);
        } else {
            delayHours = this.timeDifferenceInMinutes(flight.takeoffTime, flight.landingTime);
            flightClass = flight.status === 'malfunction' ? 'malfunction' :
                delayHours >= 120 ? 'longDelay' : '';
            this.flights.push({...flight, delayHours, flightClass});
        }
    }

    @action
    resetAnimation = () => {
        this.flightClasses.statusClass = '';
        this.flightClasses.takeoffTimeClass = '';
        this.flightClasses.landingTimeClass = '';
        this.flightClasses.landingAirportClass = '';
        this.flightClasses.delayHoursClass = '';
    }

    updateFlightClasses(newFlight: IFlight, oldFlight: IFlight) {
        const {...filterFlightProps} = oldFlight;
        const changedFields: string[] = Object.keys(filterFlightProps).filter((prop) => {
            return oldFlight[prop] === newFlight[prop];
        });
        changedFields.forEach((field) => {
            switch (field) {
                case 'status':
                    this.flightClasses.statusClass = 'flight-details-update';
                    break;
                case 'takeoffTime':
                    this.flightClasses.takeoffTimeClass = 'flight-details-update';
                    break;
                case 'landingTime':
                    this.flightClasses.landingTimeClass = 'flight-details-update';
                    break;
                case 'landingAirport':
                    this.flightClasses.landingAirportClass = 'flight-details-update';
                    break;
                case 'delayHours':
                    this.flightClasses.delayHoursClass = 'flight-details-update';
                    break;
                default:
            }
        })
    }
}

const flightsStore = new FlightsStore()
export default flightsStore;