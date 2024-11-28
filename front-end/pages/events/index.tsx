import React, {useEffect, useState} from 'react';
import EventService from '@services/EventService';
import Head from 'next/head';
import Header from '@components/header';
import {Event} from "@types"
import EventOverviewTable from "@components/events/EventOverviewTable"
import UserOverviewTable from "@components/users/UserOverviewTable"


const Events: React.FC = () => {
    const [events, setEvents] = useState<Array<Event>>();
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const getEvents = async () => {
        const response = await EventService.getAllEvents();
        const events = await response.json();
        setEvents(events);
    }

    useEffect(() => {
        getEvents();
    },
    []
    )

    return (
        <>
            <Head>
                <title>Events</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Events</h1>
                <section>
                    <h2>Events overview</h2>
                    {events && (<EventOverviewTable events={events} selectEvent={setSelectedEvent} />
                    )}
                    {selectedEvent && (
                        <UserOverviewTable event={selectedEvent} />
                    )}
                </section>
            </main>
        </>
    )

}

export default Events;