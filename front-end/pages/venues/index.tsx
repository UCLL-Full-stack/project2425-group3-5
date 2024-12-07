import React, {useEffect, useState} from 'react';
import VenueService from '@services/VenueService';
import Head from 'next/head';
import Header from '@components/header';
import {Venue} from "@types"
import VenueOverviewTable from "@components/venues/VenueOverviewTable"


const Venues: React.FC = () => {
    const [venues, setVenues] = useState<Array<Venue>>();


    const getVenues = async () => {
        const response = await VenueService.getAllVenues();
        const venues = await response.json();
        setVenues(venues);
    }

    useEffect(() => {
        getVenues();
    },
    []
    )

    return (
        <>
            <Head>
                <title>Venues</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Venues</h1>
                <section>
                    <h2>Venues overview</h2>
                    {venues && (<VenueOverviewTable venues={venues} />
                    )}
                </section>
            </main>
        </>
    )

}

export default Venues;