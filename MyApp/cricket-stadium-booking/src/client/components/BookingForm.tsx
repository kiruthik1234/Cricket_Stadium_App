import React, { useState } from 'react';

const BookingForm: React.FC = () => {
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSeatSelection = (seatNumber: number) => {
        setSelectedSeats(prevSeats => 
            prevSeats.includes(seatNumber) 
                ? prevSeats.filter(seat => seat !== seatNumber) 
                : [...prevSeats, seatNumber]
        );
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Logic to handle booking submission
        console.log('Booking submitted:', { name, email, selectedSeats });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Book Your Seats</h2>
            <div>
                <label>
                    Name:
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </label>
            </div>
            <div>
                <label>
                    Email:
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </label>
            </div>
            <div>
                <h3>Select Seats:</h3>
                {[1, 2, 3, 4, 5].map(seat => (
                    <label key={seat}>
                        <input 
                            type="checkbox" 
                            checked={selectedSeats.includes(seat)} 
                            onChange={() => handleSeatSelection(seat)} 
                        />
                        Seat {seat}
                    </label>
                ))}
            </div>
            <button type="submit">Confirm Booking</button>
        </form>
    );
};

export default BookingForm;