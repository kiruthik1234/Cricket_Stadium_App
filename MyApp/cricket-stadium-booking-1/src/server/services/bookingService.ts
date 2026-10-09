import { Booking } from '../models/booking';

export class BookingService {
    async createBooking(bookingData: any): Promise<Booking> {
        // Logic to create a booking in the database
        const newBooking = new Booking(bookingData);
        await newBooking.save();
        return newBooking;
    }

    async getBookingById(bookingId: string): Promise<Booking | null> {
        // Logic to retrieve a booking by its ID
        return await Booking.findById(bookingId).exec();
    }

    async getAllBookings(): Promise<Booking[]> {
        // Logic to retrieve all bookings
        return await Booking.find().exec();
    }

    async updateBooking(bookingId: string, updateData: any): Promise<Booking | null> {
        // Logic to update a booking
        return await Booking.findByIdAndUpdate(bookingId, updateData, { new: true }).exec();
    }

    async deleteBooking(bookingId: string): Promise<Booking | null> {
        // Logic to delete a booking
        return await Booking.findByIdAndDelete(bookingId).exec();
    }
}