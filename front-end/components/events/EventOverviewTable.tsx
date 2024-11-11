import React, { ReactNode } from 'react';
import { Event } from '@types';
import { Edit, Eye, Table, Trash2 } from 'lucide-react';

type Props = {
    events: Array<Event>;
}


const EventOverviewTable: React.FC<Props> = ({events}: Props) => {
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
                        <th className="text-center">Venue</th>
                        <th className="text-center">User</th>
                    </tr>
                    </thead>
                    <tbody>
                    {events.map((event, index) => (
                        <tr key={index}
                            role="button">
                            <td className="text-center">{event.title}</td>
                            <td className="text-center">{new Date(event.start_date).toLocaleDateString()}</td>
                            <td className="text-center">{new Date(event.end_date).toLocaleDateString()}</td>
                            <td className="text-center">{event.venueID.name}</td>
                            <td className="text-center">{event.userID.firstname} {event.userID.lastname}</td>
                            <td className="text-center">
                                <button className="btn btn-sm btn-outline-primary me-2">
                                    <Eye className="h-4 w-4"></Eye>
                                </button>
                                <button className="btn btn-sm btn-outline-secondary me-2">
                                    <Edit className="h-4 w-4" />
                                </button>
                                <button className="btn btn-sm btn-outline-danger">
                                    <Trash2 className="h-4 w-4" />
                                </button>
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