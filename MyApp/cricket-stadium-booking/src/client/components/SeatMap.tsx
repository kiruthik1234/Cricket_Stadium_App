import React from 'react';

const SeatMap: React.FC = () => {
    // Sample seating arrangement
    const seats = [
        { id: 1, isAvailable: true },
        { id: 2, isAvailable: false },
        { id: 3, isAvailable: true },
        { id: 4, isAvailable: true },
        { id: 5, isAvailable: false },
        { id: 6, isAvailable: true },
    ];

    return (
        <div>
            <h2>Seat Map</h2>
            <div className="seat-map">
                {seats.map(seat => (
                    <div key={seat.id} className={`seat ${seat.isAvailable ? 'available' : 'unavailable'}`}>
                        {seat.isAvailable ? 'Available' : 'Unavailable'}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeatMap;