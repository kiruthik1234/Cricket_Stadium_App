export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

export interface Booking {
    id: string;
    userId: string;
    stadiumId: string;
    seatNumbers: string[];
    bookingDate: Date;
}

export interface Stadium {
    id: string;
    name: string;
    location: string;
    capacity: number;
    availableSeats: number;
}