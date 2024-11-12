import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import EventForm from './EventForm';

const App = () => {
    const [events, setEvents] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await axios.get('http://localhost:3000/events');
            setEvents(response.data);
        };
        fetchEvents();
    }, []);

    const handleEventAdded = (newEvent) => {
        setEvents([...events, newEvent]);
    };

    const eventsOnDate = events.filter(event => new Date(event.date).toDateString() === date.toDateString());

    return (
        <div>
            <h1>Calendar App</h1>
            <Calendar onChange={setDate} value={date} />
            <EventForm onEventAdded={handleEventAdded} />
            <h2>Events on {date.toDateString()}</h2>
            <ul>
                {eventsOnDate.map(event => (
                    <li key={event.id}>{event.title} at {event.time} ({event.type})</li>
                ))}
            </ul>
        </div>
    );
};

export default App;