import React, { ReactNode } from 'react';
import { Event } from '@types';


type Props = {
    events: Array<Event>;
    selectEvent: (event: Event) => void;
}


const EventOverviewTable: React.FC<Props> = ({events, selectEvent}: Props) => {
    return (
        <>
            {events && (
                <div className="contrainer mt-5">
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
                    <tr>
                        <th className="text-center">Title</th>
                        <th className="text-center">Start date</th>
                        <th className="text-center">End date</th>
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