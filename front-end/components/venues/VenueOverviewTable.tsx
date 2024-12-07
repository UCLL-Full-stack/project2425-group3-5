import React from 'react';
import { Venue } from '@types';
import Link from 'next/link';


type Props = {
    venues: Array<Venue>;
}


const VenueOverviewTable: React.FC<Props> = ({venues}: Props) => {
    return (
        <>
            {venues && (
                <div className="contrainer mt-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <Link href="/venues/add">
                            <button className="btn btn-primary">Add Venue</button>
                        </Link>
                    </div>
                    <table className="table table-bordered table-hover align-middle">
                        <thead className="table-light">
                        <tr>
                            <th className="text-center">Name</th>
                            <th className="text-center">Address</th>
                            <th className="text-center">Capacity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {venues.map((venue, index) => (
                            <tr key={index}>
                                <td className="text-center">{venue.name}</td>
                                <td className="text-center">{venue.address}</td>
                                <td className="text-center">{venue.capacity}</td>
                                <td className="text-center">
                                    <Link href={''}>
                                        <button className="btn btn-warning btn-sm me-2">
                                            <i className="bi bi-pencil-square"></i> Edit
                                        </button>
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                    >
                                        <i className="bi bi-trash"></i> Delete
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

export default VenueOverviewTable;