export interface IFlight extends IFlightClass {
    flightNumber: string;
    status: 'hangar' | 'airborne' | 'malfunction';
    takeoffTime: string;
    landingTime: string;
    takeoffAirport: string;
    landingAirport: string;

    [key: string]: any;
}

interface IFlightClass {
    flightClass: string;
    delayHours: number;
}

export interface IFlightClasses {
    statusClass: string;
    takeoffTimeClass: string;
    landingTimeClass: string;
    landingAirportClass: string;
    delayHoursClass: string;
}