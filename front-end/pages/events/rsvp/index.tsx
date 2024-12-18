import React, { useEffect, useState } from 'react';

import Header from '@components/header';
import RSVPOverviewtable from '@components/rsvp/RSVPOverviewTable';

import RSVPService from '@services/RSVPservice';
import { RSVP } from '@types';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Rsvp: React.FC = () => {
    const router = useRouter();
    const eventId = Number(router.query.eventId);
    const [rsvps, setRSVPs] = useState<RSVP[]>([]);

    const getRsvps = async () => {
        const response = await RSVPService.getAllRsvpsWithEventId(eventId);
        const rsvps = await response.json();
        setRSVPs(rsvps);
    }

    useEffect(() => {
        if (eventId) {
            getRsvps();
        }
    }, [eventId]);

    return (
        <>
            <Head>
                <title>RSVP</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>RSVP</h1>
                    <h2>Create RSVPS for eventid: {eventId}</h2>
                    <Link 
                        href={{
                            pathname: "/events/rsvp/add",
                            query: {eventId}
                        }}
                    >
                    <button className="btn btn-primary">Create</button>
                    </Link>
                <section>
                    <h2>Rsvps Overview for eventId:{eventId}</h2>
                    {rsvps && (<RSVPOverviewtable rsvps={rsvps}/>)}
                </section>
            </main>
        </>
    )

}

export default Rsvp;