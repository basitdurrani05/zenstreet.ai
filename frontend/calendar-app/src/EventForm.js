import React, { useState } from 'react';
import axios from 'axios';

const EventForm = ({ onEventAdded }) => {
    const [event, setEvent] = useState({ title: '', date: '', time: '', type: '', mediaUrl: '' });

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3000/events', event);
        onEventAdded(response.data);
        setEvent({ title: '', date: '', time: '', type: '', mediaUrl: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" value={event.title} onChange={handleChange} placeholder ="Event Title" required />
            <input name="date" type="date" value={event.date} onChange={handleChange} required />
            <input name="time" type="time" value={event.time} onChange={handleChange} required />
            <select name="type" value={event.type} onChange={handleChange} required>
                <option value="">Select Type</option>
                <option value="text">Text</option>
                <option value="video">Video</option>
                <option value="picture">Picture</option>
            </select>
            <input name="mediaUrl" value={event.mediaUrl} onChange={handleChange} placeholder="Media URL (optional)" />
            <button type="submit">Add Event</button>
        </form>
    );
};

export default EventForm;