import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
    userId: string;
    stadiumId: string;
    seatNumbers: string[];
    bookingDate: Date;
}

const BookingSchema: Schema = new Schema({
    userId: { type: String, required: true },
    stadiumId: { type: String, required: true },
    seatNumbers: { type: [String], required: true },
    bookingDate: { type: Date, default: Date.now }
});

const Booking = mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;