import React from 'react';

const StadiumList: React.FC = () => {
    const stadiums = [
        { id: 1, name: 'Stadium A', location: 'City A' },
        { id: 2, name: 'Stadium B', location: 'City B' },
        { id: 3, name: 'Stadium C', location: 'City C' },
    ];

    return (
        <div>
            <h2>Available Stadiums</h2>
            <ul>
                {stadiums.map(stadium => (
                    <li key={stadium.id}>
                        {stadium.name} - {stadium.location}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StadiumList;