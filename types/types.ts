export interface IFlight {
    flightNumber: string;
    status: 'hangar' | 'airborne' | 'malfunction';
    takeoffTime: string;
    landingTime: string;
    takeoffAirport: string;
    landingAirport: string;
}

export interface IFlightClasses {
    statusClass: string;
    takeoffTimeClass: string;
    landingTimeClass: string;
    takeoffAirportClass: string;
    landingAirportClass: string;
}