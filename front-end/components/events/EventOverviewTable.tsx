import React, { ReactNode } from 'react';
import { Event } from '@types';


type Props = {
    events: Array<Event>;
}


const EventOverviewTable: React.FC<Props> = ({events}: Props) => {
    return (
        <>
            {events && (
                <table className="table table-bordered table-hover align-middle">
                    <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Start date</th>
                        <th scope="col">End date</th>
                        <th scope="col">Venue</th>
                        <th scope="col">User</th>
                    </tr>
                    </thead>
                    <tbody>
                    {events.map((event, index) => (
                        <tr key={index}
                            role="button">
                            <td>{event.title}</td>
                            <td>{event.start_date}</td>
                            <td>{event.end_date}</td>
                            <td>{event.venueID.name}</td>
                            <td>{event.userID.firstname} {event.userID.lastname}</td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default EventOverviewTable;