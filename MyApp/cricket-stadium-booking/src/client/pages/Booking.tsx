import React from 'react';
import BookingForm from '../components/BookingForm';
import StadiumList from '../components/StadiumList';

const Booking: React.FC = () => {
    return (
        <div>
            <h1>Book Your Stadium Seat</h1>
            <StadiumList />
            <BookingForm />
        </div>
    );
};

export default Booking;