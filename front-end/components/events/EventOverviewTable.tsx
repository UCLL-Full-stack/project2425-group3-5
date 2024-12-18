import { Event } from '@types';
import Link from 'next/link';
import React from 'react';


type Props = {
    events: Array<Event>;
    selectEvent: (event: Event) => void;
}


const EventOverviewTable: React.FC<Props> = ({events, selectEvent}: Props) => {
    return (
        <>
            {events && (
                <div className="contrainer mt-5">
                    <Link href="/events/add">
                        <button className="btn btn-primary">Add Event</button>
                    </Link>
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
                    <tr>
                        <th className="text-center">Title</th>
                        <th className="text-center">Start date</th>
                        <th className="text-center">End date</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {events.map((event, index) => (
                        <tr key={index}
                            onClick={() => selectEvent(event)}
                            role="button">
                            <td className="text-center">{event.title}</td>
                            <td className="text-center">{new Date(event.start_date).toLocaleDateString()}</td>
                            <td className="text-center">{new Date(event.end_date).toLocaleDateString()}</td>
                            <td className="text-center">
                                <Link 
                                    href={{
                                        pathname: "events/rsvp",
                                        query: {eventId: event.id}
                                    }}>
                                    <button className="btn btn-primary">Rsvp</button>
                                </Link>
                                </td>
                            </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            )}
        </>
    )
}

export default EventOverviewTable;