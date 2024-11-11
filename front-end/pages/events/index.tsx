import { useEffect, useState } from 'react';
import EventService from '@services/EventService';
import Head from 'next/head';
import Header from '@components/header';

import EventOverviewTable    from '@components/events/EventOverviewTable';

const Events: React.FC = () => {
    const [events, setEvents] = useState<Array<Event>>();

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
                    {events && (<EventOverviewTable events={events}></EventOverviewTable>
                    )}
                </section>
            </main>
        </>
    )

}

export default Events;